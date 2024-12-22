import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PreviewIcon from "@mui/icons-material/Preview";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridSlots,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Card, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { deletePurchaseOrder, getGroupOrder } from "@/app/apis/order-api";
import { useRouter } from "next/navigation";
import DialogUploadImagesUpdate from "./DialogUploadImagesUpdate";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import { getGroupOrderDetails } from "@/app/apis/orderDetail-api";
import useUserStore from "@/app/zustands/userStore";
import { mutate } from "swr";
import DialogSelectStatus from "./DialogSelectStatus";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface IProps {
  dataOrders: IDataOrder[];
}

export default function ListOrderSelect(props: IProps) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [tempRows, setTempRows] = React.useState<number[]>([]);
  const { role, userId } = useUserStore();
  const { dataOrders } = props;
  const { setGroupOrder, setGroupOrderDetails, setGroupOrderId } =
    useGroupDetailOrderStore();
  const router = useRouter();

  React.useEffect(() => {
    const dataRows: GridRowsProp = dataOrders.map((item, index) => ({
      id: index + 1,
      orderId: item.OrderId,
      shippingAddress: item.ShippingAddress,
      deliveryDate: item.DeliveryDate,
      totalAmount: Number(item.TotalAmount),
      note: item.Note,
      taxRate: item.TaxRate,
      status: item.Status,
      paymentMethod: item.PaymentMethod,
      shippingCost: item.ShippingCost,
      customerId: item.CustomerId,
      subOrderId: item.SubOrderId,
    }));
    setRows(dataRows);
  }, [dataOrders]);

  const EditToolbar = (props: EditToolbarProps) => {
    const handleClickRefresh = async () => {
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/orders`, false);
      setGroupOrder(null);
      setGroupOrderDetails(null);
    };
    const handleClickSave = async () => {
      try {
        await deletePurchaseOrder(tempRows);
      } catch (error) {
        throw new Error(`HandleClickSave failed - ${error}`);
      }
    };

    return (
      <GridToolbarContainer>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack direction="row">
            <Box>
              <GridToolbar />
            </Box>
            <Button
              color="primary"
              sx={{ mt: 0.5, mr: 2 }}
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleClickSave}
            >
              Save
            </Button>
            <Button
              color="primary"
              sx={{ mt: 0.5 }}
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleClickRefresh}
            >
              Refresh
            </Button>
          </Stack>
          <GridToolbarQuickFilter />
        </Stack>
      </GridToolbarContainer>
    );
  };

  const handleDeleteClick = (id: GridRowId, row: GridRowModel) => () => {
    setTempRows(() => [...tempRows, row.orderId]);

    const newRows = rows
      .filter((item) => item.orderId !== row.orderId)
      .map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    setRows(newRows);
  };

  const handlePreviewClick = (orderId: number) => async () => {
    try {
      const [order, orderDetails] = await Promise.all([
        getGroupOrder(orderId),
        getGroupOrderDetails(orderId),
      ]);
      const formatOrder = order.length > 0 ? order[0] : null;
      setGroupOrder(formatOrder);
      setGroupOrderDetails(orderDetails);
      setGroupOrderId(orderId);
    } catch (error) {
      router.push("/dashboard/Error");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "orderId",
      headerName: "Order Code",
      type: "string",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "shippingAddress",
      headerName: "Shipping Address",
      type: "string",
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 180,
      type: "number",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "taxRate",
      headerName: "Tax Rate",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "shippingCost",
      headerName: "Shipping Cost",
      width: 180,
      type: "number",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      align: "center",
      headerAlign: "center",
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      flex: 0,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        if (!role && !row) return [];
        // if (role === "" && row.status === "Created") {
        //   return [
        //     <DialogUploadImagesUpdate orderId={row.orderId} />,
        //     <GridActionsCellItem
        //       icon={<DeleteIcon />}
        //       label="Delete"
        //       onClick={handleDeleteClick(id, row)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          (role === "CUSTOMER" || role === "MANUFACTURER") &&
          row.status === "Created" &&
          row.customerId === userId ? (
            <DialogUploadImagesUpdate orderId={row.orderId} />
          ) : (
            <></>
          ),
          ((role === "MANUFACTURER" || role === "SUPPLIER") &&
            row.status === "New" &&
            row.customerId !== userId) ||
          (role === "SUPPLIER" &&
            (row.status === "Confirm" ||
              row.status === "Prepared-Shipment" ||
              row.status === "In-Transit")) ||
          (role === "MANUFACTURER" && row.status === "Material-Received") ||
          (role === "CARRIER" &&
            (row.status === "New" ||
              row.status === "Confirm" ||
              row.status === "Prepared-Shipment" ||
              row.status === "In-Transit")) ? (
            <DialogSelectStatus
              orderId={row.orderId}
              status={row.status}
              subOrderId={row.subOrderId}
            />
          ) : (
            <></>
          ),
          <GridActionsCellItem
            icon={<PreviewIcon />}
            label="Preview"
            onClick={handlePreviewClick(row.orderId)}
            color="inherit"
          />,
          row.status === "Created" ? (
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Preview"
              onClick={handleDeleteClick(id, row)}
              color="inherit"
            />
          ) : (
            <></>
          ),
        ];
      },
    },
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        getEstimatedRowHeight={() => 100}
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        // loading
        // slotProps={{
        //   loadingOverlay: {
        //     variant: "skeleton",
        //     noRowsVariant: "skeleton",
        //   },
        // }}
      />
    </Card>
  );
}
