"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useSWR from "swr";
import ListCategoryEdit from "../../../components/ListCategoryEdit";
import { getAllCategory } from "@/app/apis/categories-api";

const Categories = () => {
  const fetcher = async () => await getAllCategory();
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return <div>Failed to load: </div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      {data ? <ListCategoryEdit dataCategories={data} /> : null}
    </Box>
  );
};

export default Categories;
