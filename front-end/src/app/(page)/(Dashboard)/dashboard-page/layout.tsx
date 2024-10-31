"use client";
import * as React from "react";
import { Box, Stack, Link ,Button} from "@mui/material";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getMPTheme from "../../../theme/getMPTheme";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useGetAccessToken } from "@/app/hook/useAccessToken";
import {  getAccount} from "@/app/apis/index-api";
import useUserStore from "@/app/zustands/userStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [open, setOpen] = React.useState(false);
  const {isActive,initializeUser} = useUserStore();


  React.useEffect(() => {
    initializeUser();
    console.log(isActive);
    if (!isActive ) {
      const interval = setInterval(() => setOpen(true), 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Call api /users/ with axios when user accept active account
  const updateIsActive = async (isActive: boolean) => {
    const access_token = useGetAccessToken("access_token");
    if (!access_token) return;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
        isActive,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
    } catch (error) {
      throw new Error(`UpdateIsActive failed: ${error}`);
    }
  };

  // Handle active a account
  const handleUpdateData = () =>{
      updateIsActive(true);
  }

  return (
    <html lang="en">
      <body>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            <Box onClick={handleUpdateData}>
              {` Please activate your account ! `}
              <Link href="#">Active now</Link>
            </Box>
          </Alert>
        </Snackbar>
        <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
          <CssBaseline />

          <Box sx={{ display: "flex" }}>
            <SideMenu />
            <Box
              component="main"
              sx={(theme) => ({
                position: { sm: "relative", md: "" },
                top: { sm: "48px", md: "0" },
                height: { sm: "calc(100vh - 48px)", md: "100vh" },
                flexGrow: 1,
                pt: 2,
                backgroundImage:
                  "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
                backgroundRepeat: "no-repeat",
                overflow: "auto",
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 10,
                }}
              >
                <Header />
                {children}
              </Stack>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
