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
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import useSWR from "swr";
import { useGetOderById } from "@/app/hook/useEthereum";
import useUserStore from "@/app/zustands/userStore";

const Timeline = () => {
  const { groupOrderId, groupOrder } = useGroupDetailOrderStore();
  const { role } = useUserStore();

  const fetcher = async () =>
    await useGetOderById(
      role as string,
      groupOrderId as number,
      groupOrder as OrderGroup
    );
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/useGetOderById`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const lengthOrderTracking = data ? data.ordertracking.length - 1 : 0;

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
        {data?.ordertracking.map((step, index) => (
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
                sx={{
                  color: index === lengthOrderTracking ? "blue" : "gray",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  fontWeight={index === lengthOrderTracking ? "bold" : "normal"}
                  color={index === lengthOrderTracking ? "blue" : "gray"}
                >
                  {step.Title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  color={index === lengthOrderTracking ? "textPrimary" : "gray"}
                >
                  {step.Date}
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
