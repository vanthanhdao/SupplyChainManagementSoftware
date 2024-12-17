import * as React from "react";
import { PaletteMode } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ToggleColorMode from "./ToggleColorMode";
import MenuButton from "./MenuButton";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Search from "./Search";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
} from "@mui/material";
import SelectContent from "./SelectContent";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        {/* Menu Reponsive */}
        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
          <SelectContent />
        </Box>
      </Stack>
    </Stack>
  );
}
