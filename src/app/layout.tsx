import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import CustomThemeProvider from "./theme-provider";
import AuthGuard from "@/components/guards/authGuard";
import { getSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Apart Web App",
  description: "A modern web application for learning english",
};

export default async function RootLayout({
  lms,
  authentication,
  children,
}: Readonly<{
  children: React.ReactNode;
  authentication: React.ReactNode
  lms: React.ReactNode
}>) {

  const session = await getSessionStorageCookies()
  const userIsAuthenticated = true // TODO Implement real authentication check
  const appContent = userIsAuthenticated ? lms : authentication
  const canGoBack = headers().get('x-can-go-back') === '1'

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
            <AuthGuard>
              <>
                {appContent}
              </>
            </AuthGuard>
          </Box>

        </CustomThemeProvider>

      </body>
    </html>
  );
}
