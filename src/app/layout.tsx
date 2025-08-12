import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "./theme-provider";
import AuthGuard from "@/components/guards/authGuard";
import { getSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { ClientProvider } from "@/data/api/abstractApiClient";
import { RegisterProvider } from "@/context/RegisterContext";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Apart Web App",
  description: "A modern web application for learning english",
};

export default async function RootLayout({
  lms,
  authentication,
  no_course
}: Readonly<{
  authentication: React.ReactNode;
  lms: React.ReactNode;
  no_course: React.ReactNode;
}>) {
  const session = await getSessionStorageCookies();
  const userIsAuthenticated = session?.sessionToken !== null;
  const hasCourse = session?.hasCourse;
  const appContent = (userIsAuthenticated && !hasCourse) ? no_course : userIsAuthenticated ? lms : authentication;
  return (
    <html lang="en">
      <body className="antialiased">
        <RegisterProvider>
          <ClientProvider>
            <UserProvider>
              <CustomThemeProvider>
                <AuthGuard>
                  <>{appContent}</>
                </AuthGuard>
              </CustomThemeProvider>
            </UserProvider>
          </ClientProvider>
        </RegisterProvider>
      </body>
    </html>
  );
}
