"use client";
import * as React from "react";
import { PaletteMode, styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ToggleColorMode from "./ToggleColorMode";
import Sitemark from "./SitemarkIcon";
import { useRouter } from "next/navigation";
import AppBar_Button from "./AppBar_Button";
import { useDeleteEth,deployContract, useGetBlockByAllEvent, useGetBlockByOneEvent } from "@/app/hook/useEthereum";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <AppBar_Button/>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="small"
              onClick={() => router.push("/signin-page")}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => router.push("/signup-page")}
            >
              Sign up
            </Button>
            <ToggleColorMode
              data-screenshot="toggle-mode"
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Box>

          {/* Menu Reponsive */}
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer sx={{ display: { sm: "flex", md: "none" } }} anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ToggleColorMode
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                  />
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 3 }} />

                <MenuItem>        
                  <Button onClick={deployContract}  fullWidth variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'} }} size="large">
                      Deploy Smart Contract
                 </Button>
               </MenuItem>
                <MenuItem>
                <Button onClick={useDeleteEth}  fullWidth variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'} }} size="large">
                       Delete Eth
                </Button>
                </MenuItem>
                <MenuItem>
                <Button onClick={()=>useGetBlockByAllEvent()}  fullWidth variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'} }} size="large">
                View Blocks All Event
                </Button>
                </MenuItem>
                <MenuItem>
                <Button onClick={()=>useGetBlockByOneEvent("StoreUserSignUp")}  fullWidth  variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'} }} size="large">
                View Blocks Users Event
                </Button>
                </MenuItem> 
                <MenuItem>
                <Button onClick={()=>useGetBlockByOneEvent("StoreUserSession")} fullWidth variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'}}} size="large">
                View Blocks UserSession Event
                </Button>
                </MenuItem>
                <MenuItem>
                <Button onClick={() => router.push("/blog-page")} fullWidth variant="text" sx={{ justifyContent: {xs:'flex-start',sm:'center'}}} size="large">
                Blog
                </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={() => router.push("/signup-page")}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={() => router.push("/signin-page")}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
          
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
