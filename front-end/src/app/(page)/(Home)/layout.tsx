"use client";
import type { Metadata } from "next";
import * as React from "react";
import { Inter } from "next/font/google";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import getMPTheme from "../../theme/getMPTheme";
import { createAccount } from "@/app/apis/index-api";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const MPTheme = createTheme(getMPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const generateAdminCalled = React.useRef(false);
  // const generateAdmin = async () => {
  //   try {
  //     const data: IUser = {
  //       email: "admin@gmail.com",
  //       password: "admin0",
  //     };
  //     await createAccount(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   sessionStorage.clear();
  //   if (!generateAdminCalled.current) {
  //     generateAdminCalled.current = true;
  //     generateAdmin();
  //   }
  // }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
  };

  return (
    <html lang="en">
      <head>
        <title>Home Page | Nextjs</title>
        <meta name="description" content="This is a home page" />
        <meta property="og:title" content="Home Page" />
        <meta
          property="og:description"
          content="This page is rendered on the client side."
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
          <CssBaseline />
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
