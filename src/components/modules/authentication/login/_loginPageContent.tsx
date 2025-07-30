"use client";

import React, { useState } from "react";
import { TextField, Button, Divider, Typography, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { PATHS } from "@/constants/paths";
import { useAuthService } from "@/data/api/auth/authService";
import { useRouter } from "next/navigation";
import { setSharedSession } from "@/utils/sessionHandlerUtils";
import HeaderNavigation from "../HeaderNavigation";

const LoginPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthService();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const accessToken = response.data?.token;
          const userId = response.data?.user.id;
          if (accessToken) {
            setSharedSession({ accessToken, uid: userId });
            console.log("Inicio de sesión exitoso:", response);
          } else {
            console.error("No access token received in response:", response);
          }
        },
        onError: (error) => {
          console.error("Error al iniciar sesión:", error);
        },
      }
    );
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

        <form onSubmit={handleLogin} className="space-y-4">
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            className="normal-case"
          >
            Continuar con Google
          </Button>

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
        </form>

        <div className="mt-6 space-y-2">
          <Typography variant="body1">
            <Link href="#" underline="hover">
              <strong>¿Necesitas ayuda para iniciar sesión?</strong>
            </Link>
          </Typography>

          <Typography variant="body2">
            Al registrarte, estás creando una cuenta de Apart y aceptas los{" "}
            <Link href="#" underline="always">
              Términos
            </Link>{" "}
            y la{" "}
            <Link href="#" underline="always">
              Política de Privacidad
            </Link>{" "}
            de Apart.
          </Typography>
        </div>
      </main>
    </div>
  );
};

export default LoginPageContent;
