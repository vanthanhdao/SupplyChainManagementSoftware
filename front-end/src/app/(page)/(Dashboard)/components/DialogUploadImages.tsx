import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function DialogUploadImages() {
  const [open, setOpen] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState<{
    name: string;
    src: string | null;
    type: string;
  } | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Uploaded file:", file);
      // Thực hiện upload file hoặc xử lý file tại đây
    }
  };

  const handleConfirm = () => {
    console.log("Order confirmed!");
    // Gửi dữ liệu đơn hàng và file lên server
    handleClose();
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileType = file.type;
        const isImage = fileType.startsWith("image/");

        setFileInfo({
          name: file.name,
          src: isImage ? (reader.result as string) : null,
          type: fileType,
        });
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ marginRight: 5 }}
      >
        Confirm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
}
