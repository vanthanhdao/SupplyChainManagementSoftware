// import React from "react";
// import { Box, Typography, Grid, Button, Card } from "@mui/material";
// import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
// import {
//   DataGrid,
//   GridColDef,
//   GridRowId,
//   GridRowModel,
//   GridRowsProp,
// } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "STT", width: 20 },
//   {
//     field: "productName",
//     headerName: "Tên sản phẩm",
//     type: "number",
//     width: 180,
//     headerAlign: "center",
//     align: "center",
//   },
//   {
//     field: "unit",
//     headerName: "ĐVT",
//     type: "singleSelect",
//     valueOptions: ["Cái", "Thùng", "Kg"],
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "quantity",
//     headerName: "Số Lượng",
//     type: "number",
//     width: 0,
//     editable: true,
//     headerAlign: "center",
//     align: "center",
//   },
//   {
//     field: "price",
//     headerName: "Đơn giá",
//     type: "number",
//     width: 150,
//   },
//   {
//     field: "money",
//     headerName: "Thành tiền",
//     type: "number",
//     width: 150,
//   },
// ];

// const PurchaseOrderForm = () => {
//   const { selectedRows, setSelectedRowState } = useDetailOrderStore();
//   const [rows, setRows] = React.useState<GridRowsProp>([]);

//   React.useEffect(() => {
//     if (selectedRows) {
//       const dataRows: GridRowsProp = selectedRows.map((item, index) => ({
//         id: index + 1,
//         productId: item.productId,
//         productName: item.productName,
//         price: item.price,
//         unit: "Cái",
//         quantity: item.quantity,
//         money: item.price,
//       }));
//       setRows(dataRows);
//     } else setRows([]);
//   }, [selectedRows]);

//   const processRowUpdate = (updatedRow: GridRowModel) => {
//     try {
//       const updatedRows = rows.map((row) =>
//         row.productId === updatedRow.productId
//           ? {
//               ...row,
//               id: row.id,
//               quantity: updatedRow.quantity,
//               money: row.price * updatedRow.quantity,
//             }
//           : row
//       );
//       setRows(updatedRows);
//       updatedRow.money = updatedRow.price * updatedRow.quantity;
//       return updatedRow;
//     } catch (error) {
//       console.error("Error updating row: ", error);
//       throw error; // Ném lỗi lại để DataGrid có thể bắt
//     }
//   };

//   const handleProcessRowUpdateError = (error: any) => {
//     // Xử lý lỗi (hiển thị thông báo lỗi, log lỗi, v.v.)
//     console.error("Error occurred during row update: ", error);
//   };

//   return (
//     <Card
//       variant="outlined"
//       sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
//     >
//       <Box sx={{ padding: 4 }}>
//         {/* Header */}
//         <Typography variant="h5" align="center" gutterBottom>
//           CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
//         </Typography>
//         <Typography variant="h6" align="center" gutterBottom>
//           Độc lập – Tự do – Hạnh phúc
//         </Typography>
//         <Typography variant="h6" align="center" gutterBottom>
//           ĐƠN ĐẶT HÀNG
//         </Typography>
//         <Typography variant="body1" align="center" gutterBottom>
//           Số: ........
//         </Typography>

//         {/* Recipient */}
//         <Typography variant="body1" gutterBottom>
//           Kính gửi: Công ty
//           ..........................................................
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Công ty ………............................. có nhu cầu đặt hàng tại Quý
//           công ty theo mẫu yêu cầu.
//         </Typography>

//         {/* Order Table */}
//         <Typography variant="body1" gutterBottom>
//           Nội dung đặt hàng như sau:
//         </Typography>

//         <DataGrid
//           sx={{ border: "1px solid #000", marginTop: 2, marginBottom: 2 }}
//           rows={rows}
//           columns={columns}
//           hideFooter
//           processRowUpdate={processRowUpdate}
//           onProcessRowUpdateError={handleProcessRowUpdateError}
//         />

//         {/* Additional Information */}
//         <Grid container spacing={2} sx={{ marginBottom: 4 }}>
//           <Grid item xs={12}>
//             <Typography variant="body1">
//               Tổng cộng:{" "}
//               {rows.reduce((acc, row) => {
//                 return acc + row.money;
//               }, 0)}
//               ..........................................................................
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body1">
//               Thời gian giao
//               hàng:...........................................................................
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body1">
//               Địa điểm giao
//               hàng:.............................................................................
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body1">Phương thức thanh toán:</Typography>
//             <Typography variant="body2" gutterBottom>
//               - Thanh toán bằng tiền mặt hoặc chuyển khoản
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               - Thanh toán trước 50% giá trị hợp đồng, 50% còn lại thanh toán
//               sau khi giao hàng.
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* Footer */}
//         <Box sx={{ textAlign: "right" }}>
//           <Typography variant="body1" gutterBottom>
//             ............., ngày .....tháng....... năm .......
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             GIÁM ĐỐC
//           </Typography>
//         </Box>

//         {/* Submit Button */}
//         <Box sx={{ textAlign: "center", marginTop: 4 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => console.table(rows)}
//           >
//             Gửi Đơn Đặt Hàng
//           </Button>
//         </Box>
//       </Box>
//     </Card>
//   );
// };

// export default PurchaseOrderForm;

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
    valueOptions: ["Cái", "Thùng", "Kg"],
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
  const { selectedRows, subTotalRows, setSubTotalRows } = useDetailOrderStore();
  const { inputs, selectShippingCost } = useInputPOStore();
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
        unit: "Pieces",
        quantity: item.quantity,
        money: item.price,
      }));
      setRows(dataRows);
    } else setRows([]);
  }, [selectedRows, subTotalRows]);

  const processRowUpdate = (updatedRow: GridRowModel) => {
    try {
      const updatedRows = rows.map((row) =>
        row.productId === updatedRow.productId
          ? {
              ...row,
              id: row.id,
              quantity: updatedRow.quantity,
              money: row.price * updatedRow.quantity,
            }
          : row
      ) as DetailOrder[];
      setRows(updatedRows);
      updatedRow.money = updatedRow.price * updatedRow.quantity;
      setSubTotalRows(updatedRows);
      return updatedRow;
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
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexGrow: 1,
        height: 1000,
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
        <DialogUploadImages />
        <Button
          variant="contained"
          color="primary"
          onClick={() => reactToPrintFn()}
        >
          Print
        </Button>
      </Box>
      <Box sx={{ padding: 4 }} ref={contentRef}>
        {/* Header Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">{inputs.companyName}</Typography>
            <Typography>{inputs.companyAddress}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">Purchase Order</Typography>
            <Typography>Date: {date.toLocaleDateString()}</Typography>
            <Typography>P.O: 12345678</Typography>
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
            <Typography align="right">Tax Rate: 8.60%</Typography>
            {/* <Typography align="right">Sales Tax: $37.41</Typography> */}
            <Typography align="right" sx={{ fontWeight: "bold" }}>
              Total: $
              {(
                subTotalRows +
                selectShippingCost +
                (subTotalRows + selectShippingCost) * (8.6 / 100)
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
