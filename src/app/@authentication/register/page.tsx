"use client";

import React, { useState } from "react";
import { TextField, Button, Divider, Typography, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { SIGN_IN_ROUTE } from "@/constants/paths";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro:", { email, password });
  };

  return (
    <div className="flex flex-col items-center p-8 font-sans min-h-screen bg-white">
      <header className="w-full flex justify-between items-center border-b px-6 py-4">
        <h1 className="text-xl font-bold">APART</h1>
      </header>

      <main className="w-full max-w-md mt-12 text-center">
        <div className="text-4xl mb-4">✨</div>
        <h2 className="text-2xl font-semibold mb-2">Crea tu cuenta</h2>
        <Typography variant="body2" color="text.secondary" className="mb-6">
          Únete para acceder a todas las funcionalidades de la plataforma.
        </Typography>

        <form onSubmit={handleRegister} className="space-y-4">
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            className="normal-case"
          >
            Registrarse con Google
          </Button>

          <Divider className="my-4">o usa tu correo</Divider>

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
            Crear cuenta
          </Button>
        </form>

        <Typography variant="body2" className="mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link href={SIGN_IN_ROUTE} underline="hover">
            Inicia sesión
          </Link>
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          className="mt-4 block"
        >
          Al registrarte, aceptas los{" "}
          <Link href="#" underline="hover">
            Términos
          </Link>{" "}
          y la{" "}
          <Link href="#" underline="hover">
            Política de Privacidad
          </Link>{" "}
          de Apart.
        </Typography>
      </main>
    </div>
  );
};

export default RegisterPage;
