"use client";
import { Box, Stack,Link } from "@mui/material";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import * as React from "react";
import { Inter } from "next/font/google";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getMPTheme from "../../theme/getMPTheme";
import { ProtectedPage } from "@/app/(Home)/middleware/protectRouter";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: {  children: React.ReactNode }) {
  ProtectedPage();

  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [open, setOpen] = React.useState(false);
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString ?? "");

  React.useEffect(() => {
    if(user && !user.isActive){
    const interval = setInterval(()=>setOpen(true), 1000);
    return () => clearInterval(interval);
  }
  }, [open]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

    // Call api /users/ with axios when user accept active account
    const updateIsActive = async (user: any) => {
      try {
        const access_token = sessionStorage.getItem('access_token');
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.userId}`,
          user.isActive,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        // Handle signin page route
        const dataRespone = response.data;
        const checkData = Object.values(dataRespone).every(value=>value);
        if (checkData) {
          // Save access_token into localStorage
          sessionStorage.setItem("access_token", dataRespone.access_token);
          sessionStorage.setItem("refresh_token", dataRespone.refresh_token);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  // Handle active a account
  const handleActiveAccount = () => {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString ?? "");
    updateIsActive(user);
  };

  return (
    <html lang="en">
      <body>
      <Snackbar 
      anchorOrigin={{ vertical:'top', horizontal:'center' }}
      open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert      
          onClose={handleClose}
          severity="warning"
          sx={{ width: '100%' }}
        >
         <Box onClick={handleActiveAccount}>
         {` Please activate your account ${user.email}! `}
         <Link href='#'>Active now</Link>
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
