import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import ExpandableCellImages from "./ExpandableCellImages";
import Timeline from "./TimeLineStatus";

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
  {
    headerAlign: "center",
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
    renderCell: (params) => (
      <Box>
        $
        {params.value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Box>
    ),
  },
  {
    headerAlign: "center",
    field: "money",
    headerName: "Total Price",
    type: "number",
    width: 150,
    renderCell: (params) => (
      <Box>
        $
        {params.value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Box>
    ),
  },
];

const OrderDetail = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const { groupOrder, groupOrderDetails } = useGroupDetailOrderStore();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (groupOrderDetails) {
      const dataRows: GridRowsProp = groupOrderDetails.map((item, index) => ({
        id: index + 1,
        productId: item.ProductId,
        productName: item.ProductName,
        price: item.Price,
        unit: item.Unit,
        quantity: item.Quantity,
        money: item.Subtotal,
        images: item.Images,
      }));
      setRows(dataRows);
    }
  }, [groupOrderDetails]);

  return (
    <>
      {groupOrder && groupOrderDetails && (
        <Card
          variant="outlined"
          sx={{ width: "100%", overflow: "auto", padding: 5 }}
        >
          <Grid container spacing={3} columns={12} sx={{ pb: 5 }}>
            <Grid
              spacing={1}
              container
              size={{ xs: 6, sm: 6, md: 6, lg: 9 }}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }} width="50">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Order Number #{groupOrder?.OrderId}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 2 }}>
                <Typography color="blue">Order Created </Typography>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12, md: 12, lg: 3 }}
                border={1}
                borderRadius={5}
                borderColor="green"
              >
                <Typography sx={{ padding: 1, textAlign: "center" }}>
                  {new Date(groupOrder?.CreatedAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              size={{ xs: 1, sm: 1, md: 1, lg: 1 }}
              alignItems="center"
            ></Grid>
            <Grid
              container
              size={{ xs: 5, sm: 5, md: 5, lg: 2 }}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box>
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>Mark As Picked</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Mark As Shipped</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    Mark As Delivered
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Cancel Order</MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} columns={12}>
            <Grid
              container
              size={{ xs: 12, sm: 12, md: 12, lg: 8 }}
              sx={{ pb: 5 }}
            >
              {/* Customer Details */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    mx: "auto",
                    p: 3,
                    borderRadius: 2,
                    height: 300,
                    overflow: "auto",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Customer Details
                    </Typography>
                    <Grid container spacing={3} columns={12}>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Name Company
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.NameCompany}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            TaxCode
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.TaxCode}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                          <Typography variant="body2" color="textSecondary">
                            Email
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>
                          <Typography
                            color="primary"
                            sx={{ wordBreak: "break-word" }}
                            textAlign="right"
                          >
                            {groupOrder.Email}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Phone
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.PhoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Delivery Date
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.DeliveryDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Delivery Address */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    mx: "auto",
                    p: 3,
                    borderRadius: 2,
                    height: 300,
                    overflow: "auto",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Delivery Address
                    </Typography>
                    <Grid container spacing={3} columns={12}>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Shipping Method Name
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography
                            textAlign="right"
                            sx={{ wordBreak: "break-word" }}
                          >
                            {groupOrder.ShippingMethodName}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Description
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography
                            textAlign="right"
                            sx={{ wordBreak: "break-word" }}
                          >
                            {groupOrder.Description}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                          <Typography variant="body2" color="textSecondary">
                            Delivery Time Estimate
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>
                          <Typography
                            sx={{ wordBreak: "break-word" }}
                            textAlign="right"
                          >
                            {groupOrder.DeliveryTimeEstimate}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Max Weight
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography
                            textAlign="right"
                            sx={{ wordBreak: "break-word" }}
                          >
                            {groupOrder.MaxWeight}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Applicable Region
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography
                            textAlign="right"
                            sx={{ wordBreak: "break-word" }}
                          >
                            {groupOrder.ApplicableRegion}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Payment Method
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography
                            textAlign="right"
                            sx={{ wordBreak: "break-word" }}
                          >
                            {groupOrder.PaymentMethod}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Item Summary */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
              </Grid>
            </Grid>

            <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
              {/* Order History */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Card
                  variant="outlined"
                  sx={{
                    mx: "auto",
                    p: 2,
                    borderRadius: 2,
                    overflow: "auto",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order History
                    </Typography>
                    <Timeline />
                  </CardContent>
                </Card>
              </Grid>
              {/* Order Sumary */}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Card
                  variant="outlined"
                  sx={{
                    mx: "auto",
                    p: 3,
                    borderRadius: 2,
                    overflow: "auto",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order Sumary
                    </Typography>
                    <Grid container spacing={3} columns={12}>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Shipping Address
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.ShippingAddress}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Delivery Date
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.DeliveryDate}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            Payment
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.PaymentMethod}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="primary">
                            SubTotal
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right" color="primary">
                            {groupOrderDetails
                              .reduce((count, item) => count + item.Subtotal, 0)
                              .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            $
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                          <Typography variant="body2" color="textSecondary">
                            Delivery Fee
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>
                          <Typography
                            sx={{ wordBreak: "break-word" }}
                            textAlign="right"
                          >
                            {groupOrder.ShippingCost.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            $
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="textSecondary">
                            VAT
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right">
                            {groupOrder.TaxRate}%
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography variant="body2" color="primary">
                            Total
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                          <Typography textAlign="right" color="primary">
                            {groupOrder.TotalAmount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            $
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
        </Card>
      )}
    </>
  );
};

export default OrderDetail;
