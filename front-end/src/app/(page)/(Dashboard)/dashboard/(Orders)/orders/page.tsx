"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useSWR from "swr";
import ListOrderSelect from "../../../components/ListOrderSelect";
import { getAllOrder } from "@/app/apis/order-api";
import OrderDetail from "../../../components/OrderDetail";
import Grid from "@mui/material/Grid2";

export default function Orders() {
  const fetcher = async () => await getAllOrder();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={5} columns={12}>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          {data ? <ListOrderSelect dataOrders={data} /> : null}
        </Grid>
        <Grid size={{ sm: 12, md: 12, lg: 12 }}>
          <OrderDetail />
        </Grid>
      </Grid>
    </Box>
  );
}
