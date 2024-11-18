"use client"
import type { Metadata } from "next";
import * as React from "react";
import { Inter } from "next/font/google";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import getMPTheme from "../../theme/getMPTheme";
import { createAccount} from "@/app/apis/index-api";
import { useAddUser } from "@/app/hook/useEthereum";
import { revertAccount } from "@/app/apis/users-api";


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

    const generateAdmin = async ()=>{
      try{
      const walletAddress:IWalletAddress = {
        publicKey: "0x7f7d1a46a5107f9e496423f5b1726f5a0199b477",
        privateKey:"0x1fe238ae4a021c604e1fb34807ad6fe03c993cde474a63a00bc0ee9c7586f80c",
      };

      const data:IUser = {
        email: "admin@gmail.com",
        password: "admin0",
        phoneNumber: "0000000000",
        fullName: "Admin",
        taxCode: "000000000000",
        walletAddress: {
          publicKey: "0x7f7d1a46a5107f9e496423f5b1726f5a0199b477",
          privateKey:"0x1fe238ae4a021c604e1fb34807ad6fe03c993cde474a63a00bc0ee9c7586f80c",
        }
      }
      await createAccount(data);
      try{
        await useAddUser(walletAddress, data.email, data.phoneNumber, data.fullName, data.taxCode,"ADMIN");
        // await useStoreUserSession(walletAddress, "IGNORE", "SIGNUP");
      }catch(error){
        await revertAccount(data);
        throw new Error(`RevertAccount - ${error}`);
      }
    }catch(error){
      throw new Error(`generateAdmin failed: ${error}`);
    }
      // await useAddUser(walletAddress, "admin@gmail.com","", "Admin", "","ADMIN");
    }
    
  React.useEffect(()=>{
    sessionStorage.clear();
    generateAdmin();
  },[]);


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
