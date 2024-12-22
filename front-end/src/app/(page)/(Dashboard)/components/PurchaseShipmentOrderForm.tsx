import React, { useRef } from "react";
import { Box, Typography, Grid, Divider, Card, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import { useReactToPrint } from "react-to-print";
import useInputPOStore from "@/app/zustands/useInputPOStore";
import DialogUploadImages from "./DialogUploadImages";
import useUserStore from "@/app/zustands/userStore";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import ExpandableCellImages from "./ExpandableCellImages";
import DialogShipmentUploadImages from "./DialogShipmentUploadImages";

const columns: GridColDef[] = [
  { field: "id", headerName: "NO.", width: 20 },
  {
    field: "productId",
    headerName: "Item Code",
    type: "number",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "productName",
    headerName: "Item #",
    type: "number",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
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
    field: "unit",
    headerName: "Unit",
    type: "singleSelect",
    valueOptions: ["Pieces", "Box", "Kg"],
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Qty",
    type: "number",
    width: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "categoryName",
    headerName: "CategoryName",
    type: "number",
    width: 150,
  },
];

const PurchaseShipmentOrderForm = () => {
  const { selectedRows, subTotalRows, orderCode } = useDetailOrderStore();
  const { groupOrderDetails } = useGroupDetailOrderStore();
  const { inputs, selectShippingCost } = useInputPOStore();
  const { nameCompany, addressCompany, role } = useUserStore();
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const date = new Date();

  React.useEffect(() => {
    if (groupOrderDetails) {
      const dataRows: GridRowsProp = groupOrderDetails?.map((item, index) => ({
        id: index + 1,
        productId: item.ProductId,
        productName: item.ProductName,
        unit: item.Unit,
        quantity: item.Quantity,
        categoryName: item.CategoryName,
        images: item.Images,
      }));
      setRows(dataRows);
    }
  }, [groupOrderDetails]);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        height: 850,
        overflow: "auto",
      }}
    >
      {/* Submit Button */}
      <Box
        sx={{
          textAlign: "right",
          marginTop: 4,
        }}
      >
        {
          // (role === "CUSTOMER" || (role === "MANUFACTURER" && orderCode)) &&
          rows && rows.length > 0 ? (
            <DialogShipmentUploadImages rows={rows} onPrint={reactToPrintFn} />
          ) : null
        }
      </Box>
      <Box sx={{ padding: 4 }} ref={contentRef}>
        {/* Header Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">
              {inputs.companyName ? inputs.companyName : nameCompany}
            </Typography>
            <Typography>
              {inputs.companyAddress ? inputs.companyAddress : addressCompany}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">Purchase Order</Typography>
            <Typography>Date: {date.toLocaleDateString()}</Typography>
            {orderCode && <Typography>P.O: {orderCode}</Typography>}
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Delivery Details */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Typography>
              Delivery Date: {inputs.deliveryDate.toString()}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Shipping Via: {inputs.shippingVia}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Terms: {inputs.terms}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Shipping Details */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography>
              Ship To: {inputs.shipTo ? inputs.shipTo : addressCompany}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Seller: {inputs.seller}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Items Table */}
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
              marginTop: 2,
              marginBottom: 2,
            },
          }}
        />

        {/* Notes Section */}
        <Box sx={{ my: 2 }}>
          <Typography>{inputs.notes}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Totals Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Approved by:</Typography>
          </Grid>
          <Grid item xs={6}>
            {/* <Typography align="right">Discount (%): -</Typography> */}
            {/* <Typography align="right">
              Subtotal Less Discount: $435.00
            </Typography> */}
            {/* <Typography align="right">
              Shipping and Handling: $
              {selectShippingCost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography> */}
            <Typography align="right" sx={{ fontWeight: "bold" }}>
              Total: $
              {selectShippingCost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PurchaseShipmentOrderForm;
