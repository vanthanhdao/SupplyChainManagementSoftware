import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface IProp {
  variant?: "text" | "rectangular" | "circular";
  width?: number | string;
  height?: number | string;
}

export default function SkeletonCus(props: IProp) {
  const { variant = "text", width = "100%", height = "100%" } = props;

  return (
    <Skeleton
      sx={{ bgcolor: "grey.200" }}
      variant={variant}
      width={width}
      height={height}
    />
  );
}
