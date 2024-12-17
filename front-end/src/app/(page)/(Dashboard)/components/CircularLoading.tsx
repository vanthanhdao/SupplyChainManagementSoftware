import { Box, CircularProgress } from "@mui/material";

const CircularLoading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularLoading;
