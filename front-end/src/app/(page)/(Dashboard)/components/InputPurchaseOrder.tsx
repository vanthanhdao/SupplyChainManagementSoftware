"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import useInputPOStore from "@/app/zustands/useInputPOStore";
import useUserStore from "@/app/zustands/userStore";

interface IProps {
  dataShippings: IDataShipping[];
  dataUsers: IDataUser[];
}

export default function InputPurchaseOrder(props: IProps) {
  const { inputs, setInputPO, setShippingCost } = useInputPOStore();
  const { role } = useUserStore();
  const { dataShippings, dataUsers } = props;

  React.useEffect(() => {
    if (role === "CUSTOMER") {
      setInputPO({
        shippingVia: dataShippings[0].ShippingMethodName,
        shippingViaId: dataShippings[0].ShippingMethodID,
        seller: inputs.seller,
        sellerId: inputs.sellerId,
      });
    } else {
      setInputPO({
        shippingVia: dataShippings[0].ShippingMethodName,
        shippingViaId: dataShippings[0].ShippingMethodID,
        seller: dataUsers[0].nameCompany,
        sellerId: dataUsers[0].userId,
      });
      setShippingCost(dataShippings[0].ShippingCost);
    }
  }, [dataShippings, dataUsers]);

  return (
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
      <Box
        sx={{
          padding: 4,
        }}
      >
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Edit Information
        </Typography>
        <Grid container spacing={2}>
          {/* Company Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <TextField
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Company Name"
                autoComplete="company-name"
                size="small"
                fullWidth
                onChange={(e) => setInputPO({ companyName: e.target.value })}
              />
            </FormControl>
          </Grid>

          {/* Address */}
          {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel htmlFor="addressCompany">Address Company</FormLabel>
            <TextField
              id="addressCompany"
              name="addressCompany"
              type="text"
              placeholder="Address Company"
              autoComplete="address-company"
              size="small"
              fullWidth
              onChange={(e) => setInputPO({ companyAddress: e.target.value })}
            />
          </FormControl>
        </Grid> */}

          {/* Delivery Date */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="deliveryDate">Delivery Date</FormLabel>
              <TextField
                id="deliveryDate"
                name="deliveryDate"
                type="date"
                size="small"
                fullWidth
                onChange={(e) => {
                  const dateString = e.target.value;
                  const date = new Date(dateString);
                  setInputPO({ deliveryDate: date.toLocaleDateString() });
                }}
              />
            </FormControl>
          </Grid>

          {/* Shipping Via */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="shippingVia">Shipping Via</FormLabel>
              <TextField
                id="shippingVia"
                name="shippingVia"
                value={inputs.shippingViaId || ""}
                select
                onChange={(e) => {
                  const selectedKey = e.target.value;

                  const findShippingCost = dataShippings.find(
                    (item) => item.ShippingMethodID === Number(selectedKey)
                  );
                  if (findShippingCost) {
                    setInputPO({
                      shippingVia: findShippingCost.ShippingMethodName,
                      shippingViaId: findShippingCost.ShippingMethodID,
                    });
                    setShippingCost(findShippingCost.ShippingCost);
                  }
                }}
              >
                {dataShippings.map((option) => (
                  <MenuItem
                    key={option.ShippingMethodID}
                    value={option.ShippingMethodID}
                  >
                    {option.ShippingMethodName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          {/* Terms */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="terms">Terms</FormLabel>
              <TextField
                id="terms"
                name="terms"
                type="text"
                placeholder="Terms"
                autoComplete="terms"
                size="small"
                fullWidth
                onChange={(e) => setInputPO({ terms: e.target.value })}
              />
            </FormControl>
          </Grid>

          {/* Ship To */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="shipTo">Ship To</FormLabel>
              <TextField
                id="shipTo"
                name="shipTo"
                type="text"
                placeholder="Ship To"
                autoComplete="ship-to"
                size="small"
                fullWidth
                onChange={(e) => setInputPO({ shipTo: e.target.value })}
              />
            </FormControl>
          </Grid>

          {/* Seller */}
          {role && role !== "CUSTOMER"}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="seller">Seller</FormLabel>
              <TextField
                id="seller"
                name="seller"
                value={inputs.sellerId || ""}
                select
                onChange={(e) => {
                  const selectedKey = e.target.value;

                  const findUser = dataUsers.find(
                    (item) => item.userId === Number(selectedKey)
                  );
                  if (findUser) {
                    setInputPO({
                      seller: findUser.nameCompany,
                      sellerId: findUser.userId,
                    });
                  }
                }}
              >
                {dataUsers.map((option) => (
                  <MenuItem key={option.userId} value={option.userId}>
                    {option.nameCompany}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="note">Note</FormLabel>
              <TextField
                id="note"
                name="note"
                type="text"
                placeholder="Enter any notes here"
                size="small"
                fullWidth
                multiline
                rows={10}
                onChange={(e) => setInputPO({ notes: e.target.value })}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
