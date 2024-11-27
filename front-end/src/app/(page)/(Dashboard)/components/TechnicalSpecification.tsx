"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import useTechProductStore from "@/app/zustands/useTechProductStore";

export default function TechnicalSpecification() {
  const { specifications } = useTechProductStore();
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/fir-d9bb1.appspot.com/o/Picture1.png?alt=media&token=0d6aa311-0673-4e3c-919b-ed72bbf1fbc5",
    "https://firebasestorage.googleapis.com/v0/b/fir-d9bb1.appspot.com/o/Picture2.png?alt=media&token=c177a367-ddfb-4edb-94f1-494ebeed6541",
    "https://firebasestorage.googleapis.com/v0/b/fir-d9bb1.appspot.com/o/Picture3.png?alt=media&token=d7339671-1af2-4e77-97d3-8922b1ef1c30",
    "https://firebasestorage.googleapis.com/v0/b/fir-d9bb1.appspot.com/o/Picture4.png?alt=media&token=0a255df9-d213-41aa-93d1-2215f40c6da6",
  ];

  const [selectedImage, setSelectedImage] = React.useState(0);

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flexGrow: 1,
        maxHeight: 411,
        overflow: "auto",
      }}
    >
      <Box sx={{ padding: 4 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Technical Specifications
        </Typography>
        <Box position="relative" display="flex" justifyContent="center" mb={2}>
          <IconButton
            onClick={handlePrev}
            sx={{ position: "absolute", left: "10px", top: "50%" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <img
            src={images[selectedImage]}
            alt={`Image ${selectedImage}`}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={handleNext}
            sx={{ position: "absolute", right: "10px", top: "50%" }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Ảnh nhỏ bên dưới */}
        <Grid container spacing={1} justifyContent="center">
          {images.map((image, index) => (
            <Grid item key={index} xs={3} sm={2} md={2}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
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

        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="body2">{specifications}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Card>
  );
}
