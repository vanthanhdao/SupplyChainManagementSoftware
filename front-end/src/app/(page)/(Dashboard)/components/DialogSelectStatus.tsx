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
import { DialogContentText, MenuList, TextField } from "@mui/material";
import { updateStatusOrder } from "@/app/apis/order-api";
import {
  usePushToSubTimeLine,
  usePushToTimeLine,
} from "@/app/hook/useEthereum";
import CircularLoading from "./CircularLoading";
import useUserStore from "@/app/zustands/userStore";
import { subscribe } from "diagnostics_channel";

interface DialogUploadImagesProps {
  orderId: number;
  status: string;
  subOrderId: number;
}
// type MenuItem = {
//   value: string;
//   status: string[];
//   role: string[];
// };

// const statusListItems: MenuItem[] = [
//   {
//     value: "Confirm",
//     status: ["New"],
//     role: [],
//   },
//   {
//     value: "Reject",
//     status: ["New"],
//     role: [],
//   },
//   {
//     value: "Analyzing",
//     status: ["Confirm"],
//     role: ["MANUFACTURER"],
//   },
//   {
//     value: "Material-Ordered",
//     status: ["Analyzing"],
//     role: ["MANUFACTURER"],
//   },
//   // {
//   //   value: "In-Transit",
//   //   status: ["Confirm"],
//   //   role: ["MANUFACTURER"],
//   // },
//   // {
//   //   value: "Received",
//   //   status: ["Confirm"],
//   //   role: ["MANUFACTURER"],
//   // },
//   {
//     value: "Production",
//     status: ["Received"],
//     role: ["MANUFACTURER"],
//   },
// ];

const DialogSelectStatus: React.FC<DialogUploadImagesProps> = ({
  orderId,
  status,
  subOrderId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [checkTransac, setCheckTransac] = React.useState(true);
  const [newStatus, setNewStatus] = React.useState<string>(status);
  const [rejectReason, setRejectReason] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { role } = useUserStore();
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
    if (!orderId || !newStatus || !subOrderId || !role) return;
    if (rejectReason && rejectReason.length > 0) {
      setTitle("Order Rejected");
    }

    const timeLine = `{Date:${date.toLocaleDateString()},Status:${newStatus},Title:${title} ${rejectReason}}`;
    if (role === "MANUFACTURER") {
      setCheckTransac(await usePushToTimeLine(subOrderId, timeLine));
    }
    setCheckTransac(await usePushToSubTimeLine(orderId, timeLine));
    setLoading(checkTransac);
    setOpen(checkTransac);
    // window.location.reload();

    handleUpdateStatusOrder;
  };

  const handleUpdateStatusOrder = async () => {
    const invalidStatuses = [
      "Reject",
      "Prepared-Shipment",
      "In-Transit",
      "Production",
    ];
    await updateStatusOrder(orderId, newStatus);
    if (subOrderId && !invalidStatuses.includes(newStatus)) {
      if (newStatus === "Delivered")
        await updateStatusOrder(subOrderId, "Material-Received");
      if (newStatus === "Confirm")
        await updateStatusOrder(subOrderId, "In-Transit");
    }
  };

  const handleSendStatus = async () => {
    setLoading(checkTransac);
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
                  return <em>{newStatus || "Choose status"}</em>;
                }}
                // value={status || ""}
                defaultValue={status}
                onChange={handleChange}
                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
              >
                {status === "New" && [
                  <MenuItem key="Confirm" value="Confirm">
                    Confirm
                  </MenuItem>,
                  <MenuItem key="Reject" value="Reject">
                    Reject
                  </MenuItem>,
                ]}
                {status === "Material-Received" && (
                  <MenuItem key="Production" value="Production">
                    Production
                  </MenuItem>
                )}
                {role === "SUPPLIER" &&
                  status === "Confirm" && [
                    <MenuItem key="Prepared-Shipment" value="Prepared-Shipment">
                      Prepared-Shipment
                    </MenuItem>,
                    <MenuItem key="In-Transit1" value="In-Transit">
                      In-Transit
                    </MenuItem>,
                    <MenuItem key="Delivered" value="Delivered ">
                      Delivered
                    </MenuItem>,
                  ]}
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              </Select>
            </FormControl>
            {newStatus && newStatus === "Reject" && (
              <FormControl sx={{ mt: 2, width: 300 }}>
                <TextField
                  id="outlined-basic"
                  label="Reason"
                  variant="outlined"
                  onChange={(e) => setRejectReason(e.target.value)}
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
