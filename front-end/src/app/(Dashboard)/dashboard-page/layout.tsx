"use client";
import { Box, Stack } from "@mui/material";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import * as React from "react";
import { Inter } from "next/font/google";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getMPTheme from "../../theme/getMPTheme";
import { ProtectedPage } from "@/app/(Home)/middleware/protectRouter";


const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: {  children: React.ReactNode }) {

  ProtectedPage();
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  return (
    <html lang="en">
      <body>
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
