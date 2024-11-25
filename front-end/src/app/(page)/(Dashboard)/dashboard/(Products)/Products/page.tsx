"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useSWR from "swr";
import { getAllProduct } from "@/app/apis/products-api";
import ListProductEdit from "../../../components/ListProductEdit";

const Products = () => {
  const fetcher = async () => await getAllProduct();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
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
      {data ? <ListProductEdit dataProducts={data} /> : null}
    </Box>
  );
};

export default Products;
