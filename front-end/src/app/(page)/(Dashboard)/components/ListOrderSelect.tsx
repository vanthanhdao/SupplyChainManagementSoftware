import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { getAllCategory } from "@/app/apis/categories-api";
import { updateRecordProduct } from "@/app/apis/products-api";
import ExpandableCell from "./ExpandableCell";
import ExpandableCellImages from "./ExpandableCellImages";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadImages } from "@/app/apis/uploads-api";
import { deletePurchaseOrder } from "@/app/apis/order-api";
import { useRouter } from "next/navigation";

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
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { dataOrders } = props;
  const router = useRouter();

  //   const fetcher = async () => await getAllCategory();
  //   const { data } = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  //     fetcher
  //   );

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
    }));
    setRows(dataRows);
  }, [dataOrders]);

  const EditToolbar = (props: EditToolbarProps) => {
    const handleClickRefresh = async () => {
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/orders`, false);
    };
    const handleClickSave = async () => {
      try {
        // Handle updateRecordProduct
        await deletePurchaseOrder(tempRows);
      } catch (error) {
        router.push("/dashboard/Error");
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

  const handleEditClick = (id: GridRowId, row: GridRowModel) => () => {
    console.table(row);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
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
        if (row.status === "Created") {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id, row)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id, row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
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
