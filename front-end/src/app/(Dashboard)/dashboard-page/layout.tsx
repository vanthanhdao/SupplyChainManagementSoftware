"use client";
import { Box, Stack } from "@mui/material";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
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
        </main>
      </body>
    </html>
  );
}
