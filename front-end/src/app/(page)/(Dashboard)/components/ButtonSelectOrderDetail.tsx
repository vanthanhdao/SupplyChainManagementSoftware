import React, { FormEvent, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useGroupDetailOrderStore from "@/app/zustands/useDetailOrder-User-ShippingStore";
import useSWR from "swr";
import useDetailOrderStore from "@/app/zustands/useDetailOrderStore";
import { getGroupOrder } from "@/app/apis/order-api";
import { getGroupOrderDetails } from "@/app/apis/orderDetail-api";

interface IProps {
  dataOrders: IDataOrder[];
}

const SelectButton = (props: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setOrderCode } = useDetailOrderStore();
  const { setGroupOrder, setGroupOrderDetails } = useGroupDetailOrderStore();

  // Handle button click to open the menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu item click
  const handleMenuItemClick = async (orderId: number) => {
    setOrderCode(orderId);
    const [order, orderDetails] = await Promise.all([
      getGroupOrder(orderId),
      getGroupOrderDetails(orderId),
    ]);
    const formatOrder = order.length > 0 ? order[0] : null;
    setGroupOrder(formatOrder);
    setGroupOrderDetails(orderDetails);
    setAnchorEl(null);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        aria-controls={open ? "select-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        Select customer order to create PO
      </Button>
      <Menu
        id="select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            border: "1px solid #ddd",
            width: 300,
          },
        }}
      >
        {props &&
          props.dataOrders.map((item: any) => (
            <MenuItem onClick={() => handleMenuItemClick(item.OrderId)}>
              Order Number #{item.OrderId} | <em>Status {item.Status}</em>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default SelectButton;
