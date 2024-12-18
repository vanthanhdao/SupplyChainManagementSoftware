"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import useTechProductStore from "@/app/zustands/useTechProductStore";
import SkeletonCus from "./SkeletonCus";

export default function TechnicalSpecification() {
  const { specifications, images } = useTechProductStore();

  const [imagesArray, setImagesArray] = React.useState<string[]>([]);

  React.useEffect(() => {
    const convertImages = images ? images.split(",") : [];
    setImagesArray(convertImages);
  }, [images]);

  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
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
      <Box sx={{ padding: 4 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Technical Specifications
        </Typography>
        <Box position="relative" display="flex" justifyContent="center" mb={2}>
          {/* <IconButton
          onClick={handlePrev}
          sx={{ position: "absolute", left: "10px", top: "50%" }}
        >
          <ArrowBackIosIcon />
        </IconButton> */}

          <img
            src={imagesArray[selectedImage]}
            alt={`Image`}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "100%",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          {/* <IconButton
          onClick={handleNext}
          sx={{ position: "absolute", right: "10px", top: "50%" }}
        >
          <ArrowForwardIosIcon />
        </IconButton> */}
        </Box>

        {/* Ảnh nhỏ bên dưới */}
        <Grid container spacing={1} justifyContent="center">
          {imagesArray.map((image, index) => (
            <Grid item key={index} xs={3} sm={3} md={3}>
              <img
                src={image}
                alt={`Thumbnail`}
                onClick={() => setSelectedImage(index)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  border:
                    selectedImage === index ? "2px solid #1976d2" : "none",
                  borderRadius: "4px",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="body2">{specifications}</Typography>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Box>
    </Card>
  );
}
