"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAllProduct_StorePage } from "@/app/apis/products-api";
import useSWR, { mutate } from "swr";
import { getAllShipping } from "@/app/apis/shipping-api";
import { Card } from "@mui/material";
import ListProductSelect from "../../../components/ListProductSelect";
import TechnicalSpecification from "../../../components/TechnicalSpecification";
import InputPurchaseOrder from "../../../components/InputPurchaseOrder";
import PurchaseOrderForm from "../../../components/PurchaseOrderForm";
import ListOrderDetailsSelect from "../../../components/ListOrderDetailsSelect";
import SelectButton from "../../../components/ButtonSelectOrderDetail";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import { getAllOrder } from "@/app/apis/order-api";

const Stores = () => {
  const { orderCode } = useDetailOrderStore();
  const fetcher = async () => {
    const [products, shippings, orders] = await Promise.all([
      getAllProduct_StorePage(),
      getAllShipping(),
      getAllOrder(),
    ]);
    return { products, shippings, orders };
  };
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products-shippings-orders-storepage`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Grid container spacing={2} columns={12}>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Overview
          </Typography>
        </Grid>
        <Grid
          container
          size={{ sm: 12, md: 8, lg: 4 }}
          alignItems="center"
          justifyContent="flex-end"
        >
          {data ? <SelectButton dataOrders={data.orders} /> : null}
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          {orderCode ? <ListOrderDetailsSelect /> : null}
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 4 }}></Grid>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          <Card
            variant="outlined"
            sx={{ width: "100%", height: 500, overflow: "auto" }}
          >
            {data ? (
              <ListProductSelect
                dataProducts={data.products}
                isLoading={isLoading}
              />
            ) : null}
          </Card>
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flexGrow: 1,
              height: 500,
              overflow: "auto",
            }}
          >
            <TechnicalSpecification />
          </Card>
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flexGrow: 1,
              height: 850,
              overflow: "auto",
            }}
          >
            {data ? (
              <InputPurchaseOrder dataShippings={data.shippings} />
            ) : null}
          </Card>
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          <PurchaseOrderForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stores;
