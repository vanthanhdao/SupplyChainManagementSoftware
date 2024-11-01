"use client";
import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import { Box, IconButton, Menu } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton 
      aria-label="more"
      id="long-button"
      aria-controls={open ? 'long-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      size="small">
           <MoreVertIcon />
      </IconButton>

    <Menu 
      id="company-simple-select"
      anchorEl={anchorEl}
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 300,
              maxWidth: 500,
            },
          },
        }}
    >
        <Box>       
            <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
        </Box>
      <MenuItem>
        <ListItemAvatar>
          <Avatar alt="Sitemark web">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sitemark-web" secondary="Web app" />
      </MenuItem>
      <MenuItem>
        <ListItemAvatar>
          <Avatar alt="Sitemark App">
            <SmartphoneRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sitemark-app" secondary="Mobile application" />
      </MenuItem>
      <MenuItem>
        <ListItemAvatar>
          <Avatar alt="Sitemark Store">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sitemark-Store" secondary="Web app" />
      </MenuItem>
      <Box>      
          <ListSubheader>Development</ListSubheader>
      </Box>
      <MenuItem>
        <ListItemAvatar>
          <Avatar alt="Sitemark Store">
            <ConstructionRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sitemark-Admin" secondary="Web app" />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />
      <MenuItem>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add product" secondary="Web app" />
      </MenuItem>
    </Menu>
    </div>
  );
}
