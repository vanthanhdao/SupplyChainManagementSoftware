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
import { useAddOrder } from "@/app/hook/useEthereum";
import { uploadImages } from "@/app/apis/uploads-api";
import { updateStatusOrder } from "@/app/apis/order-api";

interface DialogUploadImagesProps {
  rows: GridRowsProp;
  onPrint: () => void;
}

const DialogUploadImages: React.FC<DialogUploadImagesProps> = ({
  rows,
  onPrint,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { subTotalRows } = useDetailOrderStore();
  const { inputs, selectShippingCost } = useInputPOStore();
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
  const date = new Date();

  const storeBlockChain = async (purchaseOrder: string) => {
    if (!selectedRows || !orderCode || !purchaseOrder) return;
    const history = [
      `{CustomerName:${nameCompany},Email:${email},CustomerAddress:${phoneNumber},TaxCode:${taxCode},Role:${role}`,
    ];
    const timeLine = [
      `{Date:${date.toLocaleDateString()},Status:'New',Title:'Valid Order'}`,
    ];
    const productList = selectedRows.map(
      (item) =>
        // `{ProductId:${item.productId},ProductName:${item.productName},CategoryName:${item.categoryName},Images:${item.images},specifications:${item.specifications}}`
        `{ProductId:${item.productId},ProductName:${item.productName},CategoryName:${item.categoryName}}`
    );
    const po = [`${purchaseOrder}`];
    const checkTransac = await useAddOrder(
      orderCode,
      productList,
      history,
      timeLine,
      po
    );
    setLoading(checkTransac);
    setOpen(checkTransac);
    window.location.reload();
    await updateStatusOrder(orderCode, "New");
  };

  const handleSendPO = async () => {
    try {
      await initializeUser();
      const purchaseOrder: IDataPurchaseOrder = {
        deliveryDate: inputs.deliveryDate,
        customerId: userId,
        shippingAddress: inputs.shipTo,
        paymentMethod: inputs.terms,
        shippingMethodId: inputs.shippingViaId,
        totalAmount:
          subTotalRows +
          selectShippingCost +
          (subTotalRows + selectShippingCost) * (Number(inputs.taxRate) / 100),
        taxRate: inputs.taxRate,
        note: inputs.notes,
      };
      const result_order = await createOrder(purchaseOrder);
      if (!result_order) return;
      const formatProps = Object.values(rows);
      const purchaseOrderDetails: IDataPurchaseOrderDetail[] = formatProps.map(
        (item) => ({
          orderId: result_order.OrderId,
          productId: item.productId,
          unitPrice: item.price,
          unit: item.unit,
          quantity: item.quantity,
          subTotal: item.money,
          subOrderId: role !== "CUSTOMER" ? orderCode : null,
        })
      );
      const result_orderDetail = await createOrderDetails(purchaseOrderDetails);
      if (!result_orderDetail) return;
      if (role !== "CUSTOMER") setOrderCode(result_order.OrderId);
      onPrint();
      setOpen(true);
    } catch (error) {
      router.push("/dashboard/Error");
    }
  };

  const handleClose = () => {
    setFileInfo(null);
    setOpen(false);
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
    await storeBlockChain(filesData);
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

export default DialogUploadImages;
