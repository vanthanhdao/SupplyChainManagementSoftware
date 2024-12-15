import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Button,
  Menu,
  MenuItem,
  CardHeader,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Grid from "@mui/material/Grid2";

const OrderDetail = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mock data
  const order = {
    orderNumber: "#256894",
    createdDate: "Sun, May 7, 2022",
    createdTime: "06:24 AM",
    customer: {
      name: "Jonathon Smith",
      email: "customer1@domain.com",
      phone: "+1 215 54756322",
    },
    deliveryAddress: {
      addressLine: "14 Anglesey Road",
      buildingName: "James Court",
      streetName: "Anglesey Road",
      postcode: "En34hv",
    },
    itemSummary: [
      {
        name: "Fjallraven - Foldsack No. 1 Backpack",
        color: "Blue",
        qty: 1,
        price: 109.95,
      },
      {
        name: "Fjallraven - Foldsack No. 1 Backpack",
        color: "Blue",
        qty: 1,
        price: 109.95,
      },
    ],
    orderHistory: [
      { status: "Delivered", date: "24 May 2022" },
      { status: "Shipped", date: "24 May 2022" },
      { status: "Dispatched from warehouse", date: "24 May 2022" },
      { status: "Pickup being Prepared", date: "24 May 2022" },
    ],
    summary: {
      payment: "Card - 65482",
      subtotal: 375.0,
      discount: -5.0,
      deliveryFee: 0.0,
      platformFee: "-5%",
      creditCardCharge: "-4.5%",
      total: 370.0,
      eligible: 390.0,
    },
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", overflow: "auto", padding: 5 }}
    >
      <Grid container spacing={3} columns={12} sx={{ pb: 5 }}>
        <Grid
          container
          size={{ xs: 6, sm: 6, md: 6, lg: 10 }}
          alignItems="center"
        >
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order Number {order.orderNumber}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
            <Typography>
              Order Created {order.createdDate} {order.createdTime}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
          justifyContent="flex-end"
        >
          <Box>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Mark As Picked</MenuItem>
              <MenuItem onClick={handleMenuClose}>Mark As Shipped</MenuItem>
              <MenuItem onClick={handleMenuClose}>Mark As Delivered</MenuItem>
              <MenuItem onClick={handleMenuClose}>Cancel Order</MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} columns={12}>
        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
          {/* Customer Details */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 400,
                mx: "auto",
                p: 2,
                borderRadius: 2,
                height: 250,
                overflow: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Customer Details
                </Typography>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography>Jonathon Smith</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography color="primary">customer1@domain.com</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography>+1 215 54756322</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Delivery Address */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 400,
                mx: "auto",
                p: 2,
                borderRadius: 2,
                height: 250,
                overflow: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Delivery Address
                </Typography>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography>Jonathon Smith</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography color="primary">customer1@domain.com</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography>+1 215 54756322</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Item Summary */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Item Summary
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.itemSummary.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.name} <br />
                      <Typography variant="caption" color="text.secondary">
                        Color: {item.color}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.qty * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
          {/* Order History */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 400,
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
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography>Jonathon Smith</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography color="primary">customer1@domain.com</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography>+1 215 54756322</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 12 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 400,
                mx: "auto",
                p: 2,
                borderRadius: 2,
                overflow: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order Sumary
                </Typography>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Name
                  </Typography>
                  <Typography>Jonathon Smith</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography color="primary">customer1@domain.com</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography>+1 215 54756322</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
    </Card>
  );
};

export default OrderDetail;
