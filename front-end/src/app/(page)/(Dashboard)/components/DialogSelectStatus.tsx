import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { DialogContentText, TextField } from "@mui/material";
import { updateStatusOrder } from "@/app/apis/order-api";
import { usePushToTimeLine } from "@/app/hook/useEthereum";
import CircularLoading from "./CircularLoading";

interface DialogUploadImagesProps {
  orderId: number;
  status: string;
}

const DialogSelectStatus: React.FC<DialogUploadImagesProps> = ({
  orderId,
  status,
}) => {
  const [open, setOpen] = React.useState(false);
  const [newStatus, setNewStatus] = React.useState<string>(status);
  const [loading, setLoading] = React.useState<boolean>(false);
  const date = new Date();
  const handleChange = (event: SelectChangeEvent<string>) => {
    setNewStatus(event.target.value);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const storeBlockChain = async () => {
    if (!orderId || !status) return;

    const timeLine = [
      `{Date:${date.toLocaleDateString()},Status:${status},Title:'Order Confirmed'}`,
    ];
    const checkTransac = await usePushToTimeLine(orderId, timeLine);
    setLoading(checkTransac);
    setOpen(checkTransac);
    // window.location.reload();
    await updateStatusOrder(orderId, newStatus);
  };

  const handleSendStatus = async () => {
    setLoading(true);
    await storeBlockChain();
  };

  return (
    <div>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        color="inherit"
        onClick={() => setOpen(true)}
      />

      <Dialog
        maxWidth="md"
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, width: 300 }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                renderValue={(newStatus) => {
                  return <em>{newStatus}</em>;
                }}
                value={newStatus}
                onChange={handleChange}
                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
              >
                <MenuItem value="Confirm">Confirm</MenuItem>
                <MenuItem value="Reject">Reject</MenuItem>
              </Select>
            </FormControl>
            {newStatus && newStatus === "Reject" && (
              <FormControl sx={{ mt: 2, width: 300 }}>
                <TextField
                  id="outlined-basic"
                  label="Reason"
                  variant="outlined"
                />
              </FormControl>
            )}
          </Box>
          {loading && <CircularLoading />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendStatus}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSelectStatus;
