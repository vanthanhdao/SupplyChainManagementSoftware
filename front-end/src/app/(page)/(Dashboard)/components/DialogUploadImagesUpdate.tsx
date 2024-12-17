import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from "react-dropzone";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GridActionsCellItem, GridRowsProp } from "@mui/x-data-grid";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import useInputPOStore from "@/app/zustands/useInputPOStore";
import useUserStore from "@/app/zustands/userStore";
import { useRouter } from "next/navigation";
import { createOrder, createOrderDetails } from "@/app/apis/purchase-orders";
import { useAddOrder } from "@/app/hook/useEthereum";
import { uploadImages } from "@/app/apis/uploads-api";
import ImageIcon from "@mui/icons-material/Image";
import { getProductByOrderId } from "@/app/apis/products-api";
import { updateStatusOrder } from "@/app/apis/order-api";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import CircularLoading from "./CircularLoading";

interface DialogUploadImagesProps {
  orderId: number;
}

const DialogUploadImagesUpdate: React.FC<DialogUploadImagesProps> = ({
  orderId,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fileInfo, setFileInfo] = React.useState<{
    name: string;
    src: string | null;
    type: string;
    acceptedFiles: File[];
  } | null>(null);
  const { nameCompany, email, phoneNumber, taxCode, role } = useUserStore();
  const { selectedRows, setSelectedRowState } = useDetailOrderStore();
  const date = new Date();
  const router = useRouter();

  const handleSend = async () => {
    try {
      const result = await getProductByOrderId(orderId);
      if (!result) return;
      const lisrProduct: DetailOrder[] = result.map((item: any) => ({
        productId: item.ProductId,
        productName: item.ProductName,
        categoryId: item.CategoryId,
        categoryName: item.CategoryName,
        images: item.Images,
        specifications: item.Specifications,
      }));
      setSelectedRowState(lisrProduct);
      setOpen(true);
    } catch (error) {
      router.push("/dashboard/Error");
    }
  };

  const storeBlockChain = async (purchaseOrder: string) => {
    if (!selectedRows || !orderId || !purchaseOrder) return;
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
      orderId,
      productList,
      history,
      timeLine,
      po
    );
    setLoading(checkTransac);
    setOpen(checkTransac);
    window.location.reload();
    await updateStatusOrder(orderId, "New");
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
      <GridActionsCellItem
        icon={<ImageIcon />}
        label="Edit"
        className="textPrimary"
        color="inherit"
        onClick={handleSend}
      />

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
          {loading && <CircularLoading />}
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

export default DialogUploadImagesUpdate;
