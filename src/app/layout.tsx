import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "./theme-provider";

export const metadata: Metadata = {
  title: "Apart Web App",
  description: "A modern web application for learning english",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomThemeProvider>
          <Box
            sx={{
              margin: 0,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            {children}
          </Box>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
