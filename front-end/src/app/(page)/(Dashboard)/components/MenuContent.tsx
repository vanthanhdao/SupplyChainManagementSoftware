import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/zustands/userStore";
import HistoryIcon from "@mui/icons-material/History";
import MemoryIcon from "@mui/icons-material/Memory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type MenuItem = {
  text: string;
  icon: React.ReactElement;
  route: string;
  role: string[];
};

const mainListItems: MenuItem[] = [
  {
    text: "Home",
    icon: <HomeIcon />,
    route: "",
    role: ["ADMIN", "MANUFACTURER", "CUSTOMER", "SUPPLIER", "CARRIER"],
  },
  {
    text: "Stores",
    icon: <StoreIcon />,
    route: "Stores",
    role: ["ADMIN", "MANUFACTURER", "CUSTOMER"],
  },
  {
    text: "Orders",
    icon: <ReceiptLongIcon />,
    route: "Orders",
    role: ["ADMIN", "MANUFACTURER", "CUSTOMER", "SUPPLIER", "CARRIER"],
  },
  {
    text: "Histories",
    icon: <HistoryIcon />,
    route: "Histories",
    role: ["ADMIN"],
  },
  {
    text: "Tasks",
    icon: <AssignmentRoundedIcon />,
    route: "Tasks",
    role: ["ADMIN"],
  },
  {
    text: "Products",
    icon: <MemoryIcon />,
    route: "Products",
    role: ["ADMIN", "MANUFACTURER", "SUPPLIER"],
  },
  {
    text: "Categories",
    icon: <CategoryIcon />,
    route: "Categories",
    role: ["ADMIN", "MANUFACTURER", "SUPPLIER"],
  },
  {
    text: "Shippings",
    icon: <LocalShippingIcon />,
    route: "Shippings",
    role: ["ADMIN", "CARRIER"],
  },
];

export default function MenuContent() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [menuContent, setMenuContent] = React.useState<MenuItem[]>([]);
  const { role } = useUserStore();
  const getMenuItemsByRole = (userRole: string | null) => {
    if (!userRole) return;
    setMenuContent(
      mainListItems.filter((item) => item.role.includes(userRole))
    );
  };

  React.useEffect(() => {
    getMenuItemsByRole(role);
    const selectStorage = Number(sessionStorage.getItem("selectedIndex")) || 0;
    setSelectedIndex(selectStorage);
  }, [role]);

  const handleListItemClick = (item: any, index: number) => {
    setSelectedIndex(index);
    sessionStorage.setItem("selectedIndex", index.toString());
    router.push(`/dashboard/${item?.route}`);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {menuContent.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(item, index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
