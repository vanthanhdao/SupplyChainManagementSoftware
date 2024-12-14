import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import StoreIcon from "@mui/icons-material/Store";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/zustands/userStore";

type MenuItem = {
  text: string;
  icon: React.ReactElement;
  route: string;
  role: string[];
};

const mainListItems: MenuItem[] = [
  {
    text: "Home",
    icon: <StoreIcon />,
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
    icon: <AnalyticsRoundedIcon />,
    route: "Orders",
    role: ["ADMIN", "MANUFACTURER", "CUSTOMER"],
  },
  {
    text: "Histories",
    icon: <PeopleRoundedIcon />,
    route: "Histories",
    role: ["ADMIN"],
  },
  { text: "Demo", icon: <HomeRoundedIcon />, route: "Demo", role: ["ADMIN"] },
  {
    text: "Tasks",
    icon: <AssignmentRoundedIcon />,
    route: "Tasks",
    role: ["ADMIN"],
  },
  {
    text: "Products",
    icon: <AssignmentRoundedIcon />,
    route: "Products",
    role: ["ADMIN", "MANUFACTURER", "SUPPLIER"],
  },
  {
    text: "Categories",
    icon: <AssignmentRoundedIcon />,
    route: "Categories",
    role: ["ADMIN", "MANUFACTURER", "SUPPLIER"],
  },
  {
    text: "Shippings",
    icon: <AssignmentRoundedIcon />,
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
