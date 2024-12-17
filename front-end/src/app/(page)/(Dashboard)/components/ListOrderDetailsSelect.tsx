import { Box, Card, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import ExpandableCellImages from "./ExpandableCellImages";
import { useEffect, useState } from "react";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";

const columns: GridColDef[] = [
  { field: "id", headerName: "NO.", width: 20, headerAlign: "center" },
  {
    field: "images",
    headerName: "Item #",
    type: "custom",
    width: 180,
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => (
      <ExpandableCellImages {...params} />
    ),
  },
  {
    headerAlign: "center",
    field: "productName",
    headerName: "Item Name",
    type: "string",
    width: 180,
    renderCell: (params: GridRenderCellParams) => <Box>{params.value}</Box>,
  },
  {
    headerAlign: "center",
    field: "unit",
    headerName: "Unit",
    type: "singleSelect",
    valueOptions: ["Pieces", "Box", "Kg"],
    width: 100,
  },
  {
    headerAlign: "center",
    field: "quantity",
    headerName: "Qty",
    type: "number",
    width: 80,
    renderCell: (params) => <Box>x{params.value}</Box>,
  },
];

const ListOrderDetailsSelect = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { groupOrderDetails } = useGroupDetailOrderStore();

  useEffect(() => {
    if (groupOrderDetails) {
      const dataRows: GridRowsProp = groupOrderDetails.map((item, index) => ({
        id: index + 1,
        productId: item.ProductId,
        productName: item.ProductName,
        unit: item.Unit,
        quantity: item.Quantity,
        images: item.Images,
      }));
      setRows(dataRows);
    }
  }, [groupOrderDetails]);

  return (
    <Card variant="outlined" sx={{ width: "100%", overflow: "auto", p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Item Summary
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        getEstimatedRowHeight={() => 100}
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
    </Card>
  );
};

export default ListOrderDetailsSelect;
