"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useTechProductStore from "@/app/zustands/useTechProductStore";

export default function ChartUserByCountry() {
  const { images, specifications } = useTechProductStore();
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h1" variant="subtitle2">
          Technical Specifications
        </Typography>
        <div>
          <Typography>Images: {images}</Typography>
          <Typography>Specifications: {specifications}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
