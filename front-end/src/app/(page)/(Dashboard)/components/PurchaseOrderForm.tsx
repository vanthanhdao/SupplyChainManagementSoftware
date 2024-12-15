import React, { useRef } from "react";
import { Box, Typography, Grid, Divider, Card, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import { useReactToPrint } from "react-to-print";
import useInputPOStore from "@/app/zustands/useInputPOStore";
import DialogUploadImages from "./DialogUploadImages";
import useUserStore from "@/app/zustands/userStore";

const columns: GridColDef[] = [
  { field: "id", headerName: "NO.", width: 20 },
  {
    field: "productName",
    headerName: "Item #",
    type: "number",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "unit",
    headerName: "Unit",
    type: "singleSelect",
    valueOptions: ["Pieces", "Box", "Kg"],
    width: 100,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Qty",
    type: "number",
    width: 80,
    editable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
  },
  {
    field: "money",
    headerName: "Total Price",
    type: "number",
    width: 150,
  },
];

const Invoice = () => {
  const {
    selectedRows,
    subTotalRows,
    orderCode,
    setSubTotalRows,
    setSelectedRowState,
  } = useDetailOrderStore();
  const { inputs, selectShippingCost } = useInputPOStore();
  const { nameCompany } = useUserStore();
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const date = new Date();

  React.useEffect(() => {
    if (selectedRows) {
      const dataRows: GridRowsProp = selectedRows.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        unit: item.unit,
        quantity: item.quantity,
        money: item.money,
      }));
      setRows(dataRows);
    }
  }, [selectedRows, subTotalRows]);

  const processRowUpdate = (updatedRow: GridRowModel) => {
    try {
      const newRows = {
        ...updatedRow,
        quantity: updatedRow.quantity as number,
        money: (updatedRow.price * updatedRow.quantity) as number,
        unit: updatedRow.unit as string,
      };
      if (!selectedRows) return newRows;
      const newSelectesRows: DetailOrder[] = selectedRows?.map((item) =>
        item.productId === updatedRow.productId
          ? {
              ...item,
              quantity: updatedRow.quantity as number,
              money: (updatedRow.price * updatedRow.quantity) as number,
              unit: updatedRow.unit as string,
            }
          : item
      );
      setSelectedRowState(newSelectesRows);
      setSubTotalRows(newSelectesRows);
      return newRows;
    } catch (error) {
      console.error("Error updating row: ", error);
      throw error;
    }
  };

  const handleProcessRowUpdateError = (error: any) => {
    // Xử lý lỗi (hiển thị thông báo lỗi, log lỗi, v.v.)
    console.error("Error occurred during row update: ", error);
  };

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
        {rows && rows.length > 0 ? (
          <DialogUploadImages rows={rows} onPrint={reactToPrintFn} />
        ) : null}
      </Box>
      <Box sx={{ padding: 4 }} ref={contentRef}>
        {/* Header Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">
              {inputs.companyName ? inputs.companyName : nameCompany}
            </Typography>
            <Typography>{inputs.companyAddress}</Typography>
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
            <Typography>Ship To: {inputs.shipTo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Seller: {inputs.seller}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Items Table */}
        <DataGrid
          sx={{ marginTop: 2, marginBottom: 2 }}
          rows={rows}
          columns={columns}
          hideFooter
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
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
            <Typography align="right">
              Subtotal: $
              {subTotalRows.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            {/* <Typography align="right">Discount (%): -</Typography> */}
            {/* <Typography align="right">
              Subtotal Less Discount: $435.00
            </Typography> */}
            <Typography align="right">
              Shipping and Handling: $
              {selectShippingCost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography align="right">Tax Rate: {inputs.taxRate}%</Typography>
            {/* <Typography align="right">Sales Tax: $37.41</Typography> */}
            <Typography align="right" sx={{ fontWeight: "bold" }}>
              Total: $
              {(
                subTotalRows +
                selectShippingCost +
                (subTotalRows + selectShippingCost) *
                  (Number(inputs.taxRate) / 100)
              ).toLocaleString("en-US", {
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

export default Invoice;
