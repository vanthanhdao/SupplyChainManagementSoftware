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
};

const mainListItems: MenuItem[] = [
  { text: "Store", icon: <StoreIcon />, route: "" },
  { text: "Orders", icon: <AnalyticsRoundedIcon />, route: "Orders" },
  { text: "Histories", icon: <PeopleRoundedIcon />, route: "Histories" },
  { text: "Demo", icon: <HomeRoundedIcon />, route: "Demo" },
  { text: "Tasks", icon: <AssignmentRoundedIcon />, route: "Tasks" },
  { text: "Products", icon: <AssignmentRoundedIcon />, route: "Products" },
  { text: "Categories", icon: <AssignmentRoundedIcon />, route: "Categories" },
  { text: "Shippings", icon: <AssignmentRoundedIcon />, route: "Shippings" },
];

const userListItems: MenuItem[] = [
  { text: "Store", icon: <StoreIcon />, route: "" },
  { text: "Orders", icon: <AnalyticsRoundedIcon />, route: "Orders" },
  { text: "Products", icon: <AssignmentRoundedIcon />, route: "Products" },
  { text: "Categories", icon: <AssignmentRoundedIcon />, route: "Categories" },
];

export default function MenuContent() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [menuContent, setMenuContent] = React.useState<MenuItem[]>([]);
  const { role } = useUserStore();

  React.useEffect(() => {
    if (role === "ADMIN") setMenuContent(mainListItems);
    else setMenuContent(userListItems);
    // Kiểm tra client-side trước khi sử dụng sessionStorage
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
