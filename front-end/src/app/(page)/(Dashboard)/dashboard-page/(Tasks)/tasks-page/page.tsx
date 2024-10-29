"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

const shippingAddress = [
  {
    name: "Company Name*",
    desc: "Monthly subscription",
  },
  {
    name: "Email*",
    desc: "user1@gmail.com",
  },
  {
    name: "Address line 1 *",
    desc: "Binh Duong",
  },
  {
    name: "Country *",
    desc: "VN",
  },
];

const Demo = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
       Tasks
      </Typography>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Order Details
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ md: 12, lg: 9 }}>
            <Grid container spacing={3}>
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                  First name
                </FormLabel>
                <OutlinedInput
                  id="first-name"
                  name="first-name"
                  type="name"
                  placeholder="John"
                  autoComplete="first name"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="last-name" required>
                  Last name
                </FormLabel>
                <OutlinedInput
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  placeholder="Snow"
                  autoComplete="last name"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address1" required>
                  Address line 1
                </FormLabel>
                <OutlinedInput
                  id="address1"
                  name="address1"
                  type="address1"
                  placeholder="Street name and number"
                  autoComplete="shipping address-line1"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>
                <OutlinedInput
                  id="address2"
                  name="address2"
                  type="address2"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  autoComplete="shipping address-line2"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="city" required>
                  City
                </FormLabel>
                <OutlinedInput
                  id="city"
                  name="city"
                  type="city"
                  placeholder="New York"
                  autoComplete="City"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="state" required>
                  State
                </FormLabel>
                <OutlinedInput
                  id="state"
                  name="state"
                  type="state"
                  placeholder="NY"
                  autoComplete="State"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="zip" required>
                  Zip / Postal code
                </FormLabel>
                <OutlinedInput
                  id="zip"
                  name="zip"
                  type="zip"
                  placeholder="12345"
                  autoComplete="shipping postal-code"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="country" required>
                  Country
                </FormLabel>
                <OutlinedInput
                  id="country"
                  name="country"
                  type="country"
                  placeholder="United States"
                  autoComplete="shipping country"
                  required
                  size="small"
                />
              </FormGrid>
            </Grid>
            <Stack
              gap={2}
              direction={{ xs: "column", sm: "row", lg: "column" }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Shipping address
              </Typography>
              <List disablePadding>
                {shippingAddress.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      sx={{ mr: 2 }}
                      primary={product.name}
                      secondary={product.desc}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack
              gap={2}
              direction={{ xs: "column", sm: "row", lg: "column" }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Total
              </Typography>
              <Typography variant="h4" gutterBottom>
                $134.98
              </Typography>
              <List disablePadding>
                {products.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      sx={{ mr: 2 }}
                      primary={product.name}
                      secondary={product.desc}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {product.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}></Grid>
        </Grid>
        <Button variant="contained" size="small">
          Confirm Order
        </Button>
      </Card>
    </Box>
  );
};

export default Demo;
