import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "./theme-provider";
import AuthGuard from "@/components/guards/authGuard";
import { getSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { ClientProvider } from "@/data/api/abstractApiClient";
import { RegisterProvider } from "@/context/RegisterContext";

export const metadata: Metadata = {
  title: "Apart Web App",
  description: "A modern web application for learning english",
};

export default async function RootLayout({
  lms,
  authentication,
}: Readonly<{
  authentication: React.ReactNode;
  lms: React.ReactNode;
}>) {
  const session = await getSessionStorageCookies();
  const userIsAuthenticated = session?.sessionToken !== null;
  const appContent = userIsAuthenticated ? lms : authentication;

  return (
    <RegisterProvider>
      <ClientProvider>
        <html lang="en">
          <body className="antialiased">
            <CustomThemeProvider>
              <AuthGuard>
                <>{appContent}</>
              </AuthGuard>
            </CustomThemeProvider>
          </body>
        </html>
      </ClientProvider>
    </RegisterProvider>
  );
}
