"use client";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        maxWidth: { sm: "100%", md: "1700px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // backgroundColor: "#f0f0f0",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", color: "#1976d2" }}
      >
        404
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4, color: "gray" }}>
        It might have been moved or deleted.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/dashboard")}
        sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
}
