import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from "react-dropzone";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GridRowsProp } from "@mui/x-data-grid";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import useInputPOStore from "@/app/zustands/useInputPOStore";
import useUserStore from "@/app/zustands/userStore";
import { useRouter } from "next/navigation";
import { createOrder, createOrderDetails } from "@/app/apis/purchase-orders";
import {
  useAddOrder,
  useAddSubOrder,
  useAddSubOrderCarrier,
} from "@/app/hook/useEthereum";
import { uploadImages } from "@/app/apis/uploads-api";
import { updateStatusOrder } from "@/app/apis/order-api";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import { formatDateTime } from "@/app/hook/formatDateTime";
import { getAccountById } from "@/app/apis/users-api";
import { getShippingById } from "@/app/apis/shipping-api";

interface DialogUploadImagesProps {
  rows: GridRowsProp;
  onPrint: () => void;
}

const DialogShipmentUploadImages: React.FC<DialogUploadImagesProps> = ({
  rows,
  onPrint,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { subTotalRows, setSelectedRowState } = useDetailOrderStore();
  const { groupOrderId, groupOrder } = useGroupDetailOrderStore();
  const { inputs, selectShippingCost } = useInputPOStore();
  const { addressCompany } = useUserStore();
  const [fileInfo, setFileInfo] = React.useState<{
    name: string;
    src: string | null;
    type: string;
    acceptedFiles: File[];
  } | null>(null);
  const { selectedRows, orderCode, setOrderCode } = useDetailOrderStore();
  const {
    userId,
    nameCompany,
    email,
    phoneNumber,
    taxCode,
    role,
    initializeUser,
  } = useUserStore();
  const router = useRouter();

  const storeAddSubOrderCarrierBlockChain = async (purchaseOrder: string) => {
    if (
      !inputs.sellerId ||
      !inputs.shippingViaId ||
      !orderCode ||
      !purchaseOrder ||
      !groupOrderId
    )
      return;
    try {
      const [findUser, findShipping] = await Promise.all([
        getAccountById(inputs.sellerId),
        getShippingById(inputs.shippingViaId),
      ]);
      if (!findUser || !findShipping) return;
      const history = `{CustomerName:${findUser.nameCompany},Email:${findUser.email},CustomerAddress:${findUser.phoneNumber},TaxCode:${findUser.taxCode},Role:${findUser.role}`;
      const timeLine = `{Date:${formatDateTime()},Status:'Shipment-Ordered',Title:'Submit Order and Wait for Confirmation'`;
      const subTimeLine = [
        `{Date:${formatDateTime()},Status:'New',Title:'Valid Order'}`,
      ];
      const shipping = `ShippingMethodID:${findShipping.ShippingMethodID},ShippingMethodName:${findShipping.ShippingMethodName},ShippingCost:${findShipping.ShippingCost},Description:${findShipping.Description}`;
      const subpo = `${purchaseOrder}`;
      const checkTransac = await useAddSubOrderCarrier(
        groupOrderId,
        orderCode,
        subTimeLine,
        subpo,
        shipping,
        timeLine,
        history
      );
      setLoading(checkTransac);
      setOpen(checkTransac);
      Promise.all([
        updateStatusOrder(orderCode, "New"),
        updateStatusOrder(groupOrderId, "Shipment-Ordered"),
      ]);
    } catch (error) {
      router.push("/dashboard/Error");
      throw error;
    }
  };

  const handleSendPO = async () => {
    try {
      await initializeUser();
      const purchaseOrder: IDataPurchaseOrder = {
        deliveryDate: inputs.deliveryDate,
        customerId: userId,
        shippingAddress: inputs.shipTo ? inputs.shipTo : addressCompany,
        paymentMethod: inputs.terms,
        shippingMethodId: inputs.shippingViaId,
        sellerId: inputs.sellerId,
        subOrderId: role !== "CUSTOMER" && groupOrderId ? groupOrderId : null,
        totalAmount:
          role === "CUSTOMER" || role === "MANUFACTURER"
            ? subTotalRows +
              selectShippingCost +
              (subTotalRows + selectShippingCost) *
                (Number(inputs.taxRate) / 100)
            : selectShippingCost,
        taxRate: inputs.taxRate,
        note: inputs.notes,
      };
      const result_order = await createOrder(purchaseOrder);
      if (!result_order) return;
      await setOrderCode(result_order.OrderId);
      setOpen(true);
      onPrint();
    } catch (error) {
      console.log(error);
      router.push("/dashboard/Error");
    }
  };

  const handleClose = () => {
    setFileInfo(null);
    setOpen(false);
    setOrderCode(null);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const formData = new FormData();
    if (!fileInfo) return;
    Array.from(fileInfo.acceptedFiles).forEach((file) => {
      formData.append("files", file);
    });
    const result = await uploadImages(formData);
    if (!result) return;
    const filesData = result.join(",");
    if (groupOrderId) {
      await storeAddSubOrderCarrierBlockChain(filesData);
    }
    setOrderCode(null);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          const fileType = file.type;

          setFileInfo({
            name: file.name,
            src: reader.result as string,
            type: fileType,
            acceptedFiles,
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={handleSendPO}>
        Confirm
      </Button>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="order-confirmation-dialog-title"
      >
        <DialogTitle id="order-confirmation-dialog-title">
          Order Comfirm
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please upload a verification image to complete your order setup.
            This image can be a translation, invoice, or document link to your
            order.
          </DialogContentText>
          <Box
            {...getRootProps()}
            sx={{
              margin: "10px",
              border: "2px dashed #cccccc",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <input {...getInputProps()} />
            {!fileInfo ? (
              <CloudUploadIcon sx={{ fontSize: "48px", color: "#cccccc" }} />
            ) : fileInfo.src &&
              fileInfo.type &&
              fileInfo.type.includes("image") ? (
              <img
                src={fileInfo.src}
                alt={fileInfo.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "8px",
                  border: "1px solid #cccccc",
                }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "#666666" }}>
                {fileInfo.name}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{ marginTop: "10px", color: "#666666" }}
            >
              Drag & Drop files here
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#999999", marginBottom: "10px" }}
            >
              or
            </Typography>
            <Button variant="contained" color="info">
              Browse Files
            </Button>
          </Box>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogShipmentUploadImages;
