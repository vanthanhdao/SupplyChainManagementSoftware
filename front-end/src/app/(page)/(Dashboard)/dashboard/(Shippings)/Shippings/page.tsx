"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useSWR from "swr";
import { getAllShipping } from "@/app/apis/shipping-api";
import ListShippingMethodEdit from "../../../components/ListShippingMethodEdit";

const Products = () => {
  const fetcher = async () => await getAllShipping();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/shipping-methods`,
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
      {data ? <ListShippingMethodEdit dataShippings={data} /> : null}
    </Box>
  );
};

export default Products;
