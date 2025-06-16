"use client";

import React, { useState } from "react";
import { TextField, Button, Divider, Typography, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { SIGN_UP_ROUTE } from "@/constants/paths";

const LoginPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inicio de sesión:", { email, password });
  };

  return (
    <div className="flex flex-col items-center p-8 font-sans min-h-screen bg-white">
      <header className="w-full flex justify-between items-center border-b px-6 py-4">
        <h1 className="text-xl font-bold">APART</h1>
      </header>

      <main className="w-full max-w-md mt-12 text-center">
        <div className="text-5xl mb-4">✦</div>
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
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-black hover:bg-gray-900 text-white"
          >
            Iniciar sesión
          </Button>
        </form>

        <div className="mt-6 space-y-2">
          <Typography variant="body2">
            <Link href="#" underline="hover">
              ¿Olvidaste tu contraseña?
            </Link>
          </Typography>

          <Typography variant="body2">
            ¿No tienes una cuenta?{" "}
            <Link href={SIGN_UP_ROUTE} underline="hover">
              Regístrate
            </Link>
          </Typography>
        </div>
      </main>
    </div>
  );
};

export default LoginPageContent;
