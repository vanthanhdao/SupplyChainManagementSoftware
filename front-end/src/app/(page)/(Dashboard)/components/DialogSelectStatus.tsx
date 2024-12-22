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
import {
  usePushBothToTimeLine,
  usePushToSubTimeLine,
  usePushToTimeLine,
} from "@/app/hook/useEthereum";
import CircularLoading from "./CircularLoading";
import useUserStore from "@/app/zustands/userStore";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/app/hook/formatDateTime";

interface DialogUploadImagesProps {
  orderId: number;
  status: string;
  subOrderId: number;
}

const invalidStatuses = [
  "Reject",
  "Prepared-Shipment",
  "In-Transit",
  "Production",
];
const titleStatus = [
  {
    status: "Confirm",
    titleTimeLine: "Confirmed Order",
  },
  {
    status: "Reject",
    titleTimeLine: "Order Rejected",
  },
  {
    status: "Production",
    titleTimeLine: "In Production",
  },
  {
    status: "Prepared-Shipment",
    titleTimeLine: "Prepared Shipment",
  },
  {
    status: "In-Transit",
    titleTimeLine: "In Transit",
  },
  {
    status: "Delivered",
    titleTimeLine: "Delivered",
  },
];

const titleStatusSUPPLIER = [
  {
    newStatus: "Confirm",
    subStatus: "Confirm",
    subTitleTimeLine: "In Transit",
  },
  {
    newStatus: "Material-Received",
    subStatus: "Delivered",
    subTitleTimeLine: "Material Received",
  },
];

const titleStatusCARRIER = [
  {
    newStatus: "Confirm",
    subStatus: "Confirm",
    subTitleTimeLine: "In Transit",
  },
  {
    newStatus: "Successfully",
    subStatus: "Delivered",
    subTitleTimeLine: "Shipping Successfully",
  },
];

const DialogSelectStatus: React.FC<DialogUploadImagesProps> = ({
  orderId,
  status,
  subOrderId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [newStatus, setNewStatus] = React.useState<string>(status);
  const [rejectReason, setRejectReason] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { role } = useUserStore();
  const router = useRouter();

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
    console.log(subOrderId, orderId);
    try {
      if (rejectReason && rejectReason.length > 0) {
        setTitle("Order Rejected");
      }
      const find = titleStatus.find((item) => item.status === newStatus);
      const timeLine = find
        ? `{Date:${formatDateTime()},Status:${newStatus},Title:${
            find?.titleTimeLine
          } ${rejectReason}}`
        : "";
      if (role === "MANUFACTURER") {
        if (subOrderId) {
          const checkTransac = await usePushToSubTimeLine(orderId, timeLine);
          setLoading(checkTransac);
          setOpen(checkTransac);
        } else {
          const checkTransac = await usePushToTimeLine(orderId, timeLine);
          setLoading(checkTransac);
          setOpen(checkTransac);
        }
      } else {
        let find = null;
        if (role === "SUPPLIER") {
          find = titleStatusSUPPLIER.find(
            (item) => item.subStatus === newStatus
          );
        } else {
          find = titleStatusCARRIER.find(
            (item) => item.subStatus === newStatus
          );
        }
        const subTimeLine = find
          ? `{Date:${formatDateTime()},Status:${find.newStatus},Title:${
              find?.subTitleTimeLine
            } ${rejectReason}}`
          : "";
        const checkTransac = await usePushBothToTimeLine(
          subOrderId,
          orderId,
          subTimeLine,
          timeLine
        );
        setLoading(checkTransac);
        setOpen(checkTransac);
      }
      //Handle update status in backend
      await updateStatusOrder(orderId, newStatus);
      if (subOrderId && !invalidStatuses.includes(newStatus)) {
        if (newStatus === "Delivered") {
          if (role === "CARRIER")
            await updateStatusOrder(subOrderId, "Succecfully");
          else await updateStatusOrder(subOrderId, "Material-Received");
        }
        if (newStatus === "Confirm")
          await updateStatusOrder(subOrderId, "In-Transit");
      }
    } catch (error) {
      router.push("/dashboard/Error");
      throw error;
    }
  };

  const handleSendStatus = async () => {
    setLoading(true);
    if (!orderId || !newStatus || !role) {
      setLoading(false);
      return;
    }
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
                {(role === "SUPPLIER" || role === "CARRIER") &&
                  (status === "Confirm" ||
                    status === "Prepared-Shipment" ||
                    status === "In-Transit" ||
                    status === "Delivered") && [
                    <MenuItem key="Prepared-Shipment" value="Prepared-Shipment">
                      Prepared-Shipment
                    </MenuItem>,
                    <MenuItem key="In-Transit1" value="In-Transit">
                      In-Transit
                    </MenuItem>,
                    <MenuItem key="Delivered" value="Delivered">
                      Delivered
                    </MenuItem>,
                  ]}
                <MenuItem key={status} value={status} sx={{ display: "none" }}>
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
