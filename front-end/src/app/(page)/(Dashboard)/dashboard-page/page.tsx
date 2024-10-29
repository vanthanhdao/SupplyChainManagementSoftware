

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
import Search from "../components/Search";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import ChartUserByCountry from "../components/ChartUserByCountry";
import CustomizedTreeView from "../components/CustomizedTreeView";


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

const Store = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Card variant="outlined" sx={{ width: "100%" }}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ md: 12, lg: 7 }}>
          <Stack
        direction="row"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          mb:2
        }}
        spacing={2}
        >
        <Typography component="h2" variant="h6" >
         Store
        </Typography>
        <Search />    
      </Stack>
            <CustomizedDataGrid />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack
              gap={2}
              direction={{ xs: "column", sm: "row", lg: "column" }}
            >
              <ChartUserByCountry />
              <CustomizedTreeView />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Store;