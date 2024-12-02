import { Box, Link } from "@mui/material";
import { GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import React from "react";

const ExpandableCellImages = (value: GridRenderCellParams) => {
  const [expanded, setExpanded] = React.useState(true);
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const convertImages = value.value.split(",");
    setImages(convertImages);
  }, [value]);

  return (
    <Box sx={{ p: 3 }}>
      {expanded ? (
        <img
          src={images[0]}
          alt="Product"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
          }}
        />
      ) : (
        images.map((image: any) => (
          <img
            src={image}
            alt="Product"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        ))
      )}
      &nbsp;
      <Link
        type="button"
        component="button"
        sx={{ fontSize: "inherit", letterSpacing: "inherit" }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "View More" : "View Less"}
      </Link>
    </Box>
  );
};

export default ExpandableCellImages;
