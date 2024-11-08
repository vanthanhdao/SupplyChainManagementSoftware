"use client";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "../../../components/StatCard";
import HighlightedCard from "../../../components/HighlightedCard";
import SessionsChart from "../../../components/SessionsChart";
import PageViewsBarChart from "../../../components/PageViewsBarChart";



export default function Demo() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ sm: 12, md: 6, lg: 6}}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 ,lg: 6}}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}
