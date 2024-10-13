"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

const Demo = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Demo
      </Typography>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Order Details
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ md: 12, lg: 9 }}></Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Stack
              gap={2}
              direction={{ xs: "column", sm: "row", lg: "column" }}
            ></Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Demo;
