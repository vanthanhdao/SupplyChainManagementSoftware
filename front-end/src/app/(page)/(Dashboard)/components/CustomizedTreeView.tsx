// "use client"
// import * as React from 'react';
// import clsx from 'clsx';
// import { animated, useSpring } from '@react-spring/web';
// import { TransitionProps } from '@mui/material/transitions';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Collapse from '@mui/material/Collapse';
// import Typography from '@mui/material/Typography';
// import useDetailOrderStore from '@/app/zustands/useDetailOrderStore';

// export default function CustomizedTreeView() {
//   const {selectedRows} = useDetailOrderStore();

//   return (
//     <Card
//       variant="outlined"
//       sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
//     >
//       <CardContent>
//         <Typography component="h2" variant="subtitle2">
//           Details Order
//         </Typography>
//           {selectedRows?.map((item,index)=>(
//             <div key={index}>
//       <h1>Product Name: {item.productName}</h1>
//       <h2>Category Name: {item.categoryName}</h2>
//       <h2>Price: {item.price}</h2>
//       <h2>Quantity: </h2>
//             </div>
//           ))}
//       </CardContent>
//     </Card>
//   );
// }

import React from "react";
import { Box, Typography, Grid, Button, Card } from "@mui/material";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "STT", width: 20 },
  {
    field: "productName",
    headerName: "Tên sản phẩm",
    type: "number",
    width: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "unit",
    headerName: "ĐVT",
    type: "singleSelect",
    valueOptions: ["Cái", "Thùng", "Kg"],
    width: 100,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Số Lượng",
    type: "number",
    width: 0,
    editable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "price",
    headerName: "Đơn giá",
    type: "number",
    width: 150,
  },
  {
    field: "money",
    headerName: "Thành tiền",
    type: "number",
    width: 150,
  },
];

const OrderForm = () => {
  const { selectedRows, setSelectedRowState } = useDetailOrderStore();
  const [rows, setRows] = React.useState<GridRowsProp>([]);

  React.useEffect(() => {
    if (selectedRows) {
      const dataRows: GridRowsProp = selectedRows.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        unit: "Cái",
        quantity: item.quantity,
        money: item.price,
      }));
      setRows(dataRows);
    } else setRows([]);
  }, [selectedRows]);

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
      );
      setRows(updatedRows);
      updatedRow.money = updatedRow.price * updatedRow.quantity;
      return updatedRow;
    } catch (error) {
      console.error("Error updating row: ", error);
      throw error; // Ném lỗi lại để DataGrid có thể bắt
    }
  };

  const handleProcessRowUpdateError = (error: any) => {
    // Xử lý lỗi (hiển thị thông báo lỗi, log lỗi, v.v.)
    console.error("Error occurred during row update: ", error);
  };

  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
    >
      <Box sx={{ padding: 4 }}>
        {/* Header */}
        <Typography variant="h5" align="center" gutterBottom>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Độc lập – Tự do – Hạnh phúc
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          ĐƠN ĐẶT HÀNG
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Số: ........
        </Typography>

        {/* Recipient */}
        <Typography variant="body1" gutterBottom>
          Kính gửi: Công ty
          ..........................................................
        </Typography>
        <Typography variant="body1" gutterBottom>
          Công ty ………............................. có nhu cầu đặt hàng tại Quý
          công ty theo mẫu yêu cầu.
        </Typography>

        {/* Order Table */}
        <Typography variant="body1" gutterBottom>
          Nội dung đặt hàng như sau:
        </Typography>

        <DataGrid
          sx={{ border: "1px solid #000", marginTop: 2, marginBottom: 2 }}
          rows={rows}
          columns={columns}
          hideFooter
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />

        {/* Additional Information */}
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12}>
            <Typography variant="body1">
              Tổng cộng:{" "}
              {rows.reduce((acc, row) => {
                return acc + row.money;
              }, 0)}
              ..........................................................................
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Thời gian giao
              hàng:...........................................................................
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Địa điểm giao
              hàng:.............................................................................
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Phương thức thanh toán:</Typography>
            <Typography variant="body2" gutterBottom>
              - Thanh toán bằng tiền mặt hoặc chuyển khoản
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Thanh toán trước 50% giá trị hợp đồng, 50% còn lại thanh toán
              sau khi giao hàng.
            </Typography>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body1" gutterBottom>
            ............., ngày .....tháng....... năm .......
          </Typography>
          <Typography variant="body1" gutterBottom>
            GIÁM ĐỐC
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.table(rows)}
          >
            Gửi Đơn Đặt Hàng
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default OrderForm;
