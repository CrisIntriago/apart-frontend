"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Divider, Typography, Link } from "@mui/material";
import { PATHS } from "@/constants/paths";
import { useAuthService } from "@/data/api/auth/authService";
import { useRouter } from "next/navigation";
import {
  setSharedSession,
  handleLoginSuccess,
} from "@/utils/sessionHandlerUtils";
import HeaderNavigation from "../HeaderNavigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRegister } from "@/context/RegisterContext";

const LoginPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthService();
  const router = useRouter();
  const { formData, setFormData } = useRegister();

  useEffect(() => {
    router.replace(PATHS.LOGIN);
  }, [router]);

  const _handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    login.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          handleLoginSuccess(response);
        },
        onError: (error) => {
          console.error("Error al iniciar sesión:", error);
          setErrorMessage("Correo o contraseña incorrectos");
        },
      }
    );
  };

  const _handleLoginGoogle = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      login.mutate(
        { google_token: credentialResponse.credential },
        {
          onSuccess: (response) => {
            handleLoginSuccess(response);
          },
          onError: (error: any) => {
            if (error.status === 404) {
              const google_data = error.data.user;
              const [firstName, ...rest] = google_data.username.split(" ");
              const lastName = rest.join(" ");
              setFormData({
                ...formData,
                email: google_data.email,
                username: google_data.username,
                photo: google_data.photo,
                firstName: firstName || "",
                lastName: lastName || "",
                password: google_data.password,
              });
              router.push(PATHS.REGISTER.STEP_TWO);
            }
            console.error("Error al iniciar sesión:", error);
            setErrorMessage("Correo o contraseña incorrectos");
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center p-0 font-sans min-h-screen bg-white">
      <HeaderNavigation />
      <div className="w-full border-b-2 border-black"></div>

      <div className="w-full flex justify-center mt-6 mb-4">
        <img src="/images/logo.jpg" alt="Logo" className="w-15 h-auto" />
      </div>

      <main className="w-full max-w-md px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">Inicia sesión</h2>

        <form onSubmit={_handleLogin} className="space-y-4 flex flex-col items-center w-full">
          <div className="flex justify-center items-center w-full">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ""}>
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => _handleLoginGoogle(credentialResponse)}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                    type="standard"
                    width="100%"
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                  />
                </div>
            </GoogleOAuthProvider>
          </div>

          <Divider className="my-4">o</Divider>

          <TextField
            label="Correo electrónico"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              style: { backgroundColor: "#E3E3E3" },
            }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              style: { backgroundColor: "#E3E3E3" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-black hover:bg-gray-900 text-white"
          >
            Ingresar
          </Button>

          {errorMessage && (
            <Typography variant="body2" color="error" className="mt-2">
              {errorMessage}
            </Typography>
          )}
        </form>

        <div className="mt-6 space-y-2">
          <Typography variant="body1">
            <Link
              component="button"
              underline="hover"
              onClick={() => router.push(PATHS.FORGOT_PASSWORD)}
            >
              <strong>¿Olvidaste tu contraseña?</strong>
            </Link>
          </Typography>

        </div>
      </main>
    </div>
  );
};

export default LoginPageContent;
