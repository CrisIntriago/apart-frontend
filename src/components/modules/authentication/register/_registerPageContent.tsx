"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Divider, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import HeaderNavigation from "../HeaderNavigation";

const RegisterPageContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registro enviado:", { email, password });
  };

  return (
    <div className="flex flex-col items-center p-0 font-sans min-h-screen bg-white">
      <HeaderNavigation />
      <div className="w-full border-b-2 border-black"></div>

      <div className="w-full flex justify-center mt-6 mb-4">
        <img src="/images/logo.jpg" alt="Logo" className="w-15 h-auto" />
      </div>

      <main className="w-full max-w-md px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">Crea tu cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            className="normal-case"
          >
            Registrarse con Google
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
            Registrarse
          </Button>
        </form>

        <div className="mt-6 space-y-2">
          <Typography variant="body2">
            Al registrarte, aceptas nuestros términos y condiciones.
          </Typography>
        </div>
      </main>
    </div>
  );
};

export default RegisterPageContent;
