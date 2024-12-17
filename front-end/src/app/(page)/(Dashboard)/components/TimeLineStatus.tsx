import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const Timeline = () => {
  const steps = [
    { label: "Delivered", date: "24 May 2022", active: true },
    { label: "Shipped", date: "24 May 2022", active: false },
    { label: "Dispatched from hub", date: "24 May 2022", active: false },
    { label: "Pickup being arranged", date: "24 May 2022", active: false },
    { label: "Delivered", date: "24 May 2022", active: false },
    { label: "Shipped", date: "24 May 2022", active: false },
    { label: "Dispatched from hub", date: "24 May 2022", active: false },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pl: 4,
        position: "relative",
      }}
    >
      {/* Đường kẻ timeline */}
      <Box
        sx={{
          position: "absolute",
          left: "12px",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "gray",
        }}
      />
      <List>
        {steps.map((step, index) => (
          <ListItem
            key={index}
            sx={{
              alignItems: "flex-start",
              padding: "0",
              position: "relative",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px", zIndex: 1 }}>
              <CircleIcon
                fontSize="inherit"
                sx={{ color: step.active ? "blue" : "gray" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight={step.active ? "bold" : "normal"}
                  color={step.active ? "blue" : "gray"}
                >
                  {step.label}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color={step.active ? "textPrimary" : "gray"}
                >
                  {step.date}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Timeline;
