"use client";
import * as React from "react";
import AppAppBar from "./AppAppBar";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material/styles";
import getMPTheme from "../../theme/getMPTheme";

export default function AppHeader() {

  const [mode, setMode] = React.useState<PaletteMode>("light");


  const toggleColorMode = () => {
      const newMode = mode === "dark" ? "light" : "dark";
      setMode(newMode);
    };
  return (
    <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
  );
}
