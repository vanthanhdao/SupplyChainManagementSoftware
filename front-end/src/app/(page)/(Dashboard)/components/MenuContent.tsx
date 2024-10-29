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
import StoreIcon from '@mui/icons-material/Store';
import { useRouter } from "next/navigation";

const mainListItems = [
  { text: "Store", icon: <StoreIcon  />, route: "" },
  { text: "Orders", icon: <AnalyticsRoundedIcon /> ,  route: "order-page"},
  { text: "Clients", icon: <PeopleRoundedIcon /> },
  { text: "Demo", icon: <HomeRoundedIcon />, route: "demo-page" },
  { text: "Tasks", icon: <AssignmentRoundedIcon />, route: "tasks-page" },
];

export default function MenuContent() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState( () => Number(localStorage.getItem('selectedIndex')) || 0);

  const handleListItemClick = (item:any,index: number) => {
    setSelectedIndex(index);
    localStorage.setItem('selectedIndex', index.toString());
    router.push(`/dashboard-page/${item?.route}`)
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
             selected={selectedIndex === index}
              onClick={() => handleListItemClick(item,index)}
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
