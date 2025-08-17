import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "./theme-provider";
import AuthGuard from "@/components/guards/authGuard";
import { getSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { ClientProvider } from "@/data/api/abstractApiClient";
import { RegisterProvider } from "@/context/RegisterContext";
import { UserProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Apart - La realidad es flexible",
  description: "Cambia tu vida, aprende inglés",
  openGraph: {
    images: `https://d362kojubhlm1d.cloudfront.net/LandingPagepreview.webp`,
  },
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
  const appContent = userIsAuthenticated ? lms : authentication;


  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ""}>
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
        </GoogleOAuthProvider>

      </body>
    </html>
  );
}
