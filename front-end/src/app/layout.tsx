"use client"
import type { Metadata } from "next";
import * as React from "react";
import { Inter } from "next/font/google";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getMPTheme from "./theme/getMPTheme";


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
        <meta property="og:description" content="This page is rendered on the client side." />
      </head>
            <body className={inter.className}>
            <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <main>
                    {children}
                </main>
                <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
