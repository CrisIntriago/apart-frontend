"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Link, Divider } from "@mui/material";
import { PATHS } from "@/constants/paths";
import { useAuthService } from "@/data/api/auth/authService";
import { useRouter } from "next/navigation";
import HeaderNavigation from "../HeaderNavigation";

const ForgotPasswordModule = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { passwordReset } = useAuthService();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    passwordReset.mutate(
      { email },
      {
        onSuccess: (res) => {
          if (res?.data?.detail) {
            setSuccessMessage(res.data.detail);
          }
        },
        onError: (err: any) => {
          if (err?.response?.data?.email) {
            setErrorMessage(err.response.data.email[0]);
          } else {
            setErrorMessage("Ocurrió un error al procesar la solicitud.");
          }
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
        <h2 className="text-2xl font-semibold mb-6">
          Recupera tu contraseña
        </h2>

        <Typography variant="body2" className="mb-4">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-black hover:bg-gray-900 text-white"
            disabled={passwordReset.isPending}
          >
            {passwordReset.isPending ? "Enviando..." : "Enviar enlace"}
          </Button>

          {successMessage && (
            <Typography variant="body2" color="success.main" className="mt-2">
              {successMessage}
            </Typography>
          )}

          {errorMessage && (
            <Typography variant="body2" color="error" className="mt-2">
              {errorMessage}
            </Typography>
          )}
        </form>

        <Divider className="my-6" />

        <Typography variant="body2">
          <Link
            component="button"
            underline="hover"
            onClick={() => router.push(PATHS.LOGIN)}
          >
            Volver a iniciar sesión
          </Link>
        </Typography>
      </main>
    </div>
  );
};

export default ForgotPasswordModule;
