"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAllProduct } from "@/app/apis/products-api";
import useSWR from "swr";
import ListProductSelect from "../components/ListProductSelect";
import PurchaseOrderForm from "../components/PurchaseOrderForm";
import InputPurchaseOrder from "../components/InputPurchaseOrder";
import { getAllShipping } from "@/app/apis/shipping-api";
import TechnicalSpecification from "../components/TechnicalSpecification";

const Store = () => {
  const fetcher = async () => {
    const [products, shippings] = await Promise.all([
      getAllProduct(),
      getAllShipping(),
    ]);
    return { products, shippings };
  };
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products-shippings`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    // <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
    //   {/* cards */}
    //   <Card variant="outlined" sx={{ width: "100%" }}>
    //     <Grid container spacing={2} columns={12}>
    //       <Grid size={{ md: 12, lg: 7 }}>
    //       <Stack
    //     direction="row"
    //     sx={{
    //       alignItems: { xs: "flex-start", md: "center" },
    //       justifyContent: "space-between",
    //       mb:2
    //     }}
    //     spacing={2}
    //     >
    //     <Typography component="h2" variant="h6" >
    //      Store
    //     </Typography>
    //     <Search />
    //   </Stack>
    //         <CustomizedDataGrid />
    //       </Grid>

    //       <Grid size={{ xs: 12, lg: 5 }}>
    //         <Stack
    //           gap={2}
    //           direction={{ xs: "column", sm: "row", lg: "column" }}
    //         >
    //           <ChartUserByCountry />
    //           <CustomizedTreeView />
    //         </Stack>
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </Box>

    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          {data ? <ListProductSelect dataProducts={data.products} /> : null}
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <TechnicalSpecification />
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          {data ? <InputPurchaseOrder dataShippings={data.shippings} /> : null}
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          <PurchaseOrderForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Store;
