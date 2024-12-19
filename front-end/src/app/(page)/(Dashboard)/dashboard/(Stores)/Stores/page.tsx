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
import useUserStore from "@/app/zustands/userStore";
import ChartUserByCountry from "../../../components/ChartUserByCountry";
import SkeletonCus from "../../../components/SkeletonCus";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";

const Stores = () => {
  const { groupOrderId } = useGroupDetailOrderStore();
  const { role } = useUserStore();
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
          <Typography component="h2" variant="h6">
            Overview
          </Typography>
        </Grid>
        <Grid
          container
          size={{ sm: 12, md: 8, lg: 4 }}
          alignItems="center"
          justifyContent="flex-end"
        >
          {role !== "CUSTOMER" && data ? (
            <SelectButton dataOrders={data.orders} />
          ) : null}
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          {role !== "CUSTOMER" && groupOrderId ? (
            <ListOrderDetailsSelect />
          ) : null}
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 4 }}>
          {role !== "CUSTOMER" && groupOrderId ? <ChartUserByCountry /> : null}
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          {data ? (
            <ListProductSelect dataProducts={data.products} />
          ) : (
            <SkeletonCus variant="rectangular" height="100%" />
          )}
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          <TechnicalSpecification />
        </Grid>
        <Grid size={{ sm: 12, md: 4, lg: 4 }}>
          {data ? (
            <InputPurchaseOrder dataShippings={data.shippings} />
          ) : (
            <SkeletonCus variant="rectangular" height="100%" />
          )}
        </Grid>
        <Grid size={{ sm: 12, md: 8, lg: 8 }}>
          <PurchaseOrderForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stores;
