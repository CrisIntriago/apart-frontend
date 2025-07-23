"use client";

import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import LayoutRegister from "@/components/modules/authentication/register/LayoutRegister";
import { useRegister } from "@/context/RegisterContext"; // Ajusta ruta si hace falta

const VerifyUser = () => {
  const router = useRouter();
  const { formData } = useRegister();

  return (
    <LayoutRegister>
      <div className="bg-white px-6 py-10 rounded-xl shadow-md text-center space-y-6 max-w-md mx-auto">
        <Typography variant="h5" className="font-bold">
          Verifica tu cuenta
        </Typography>

        <Typography className="text-sm text-gray-600">
          Te hemos enviado un enlace a tu correo electrónico <br />
          <strong>{formData.email}</strong> para confirmar tu cuenta.
          Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          className="bg-black text-white"
          onClick={() => router.push("/")}
        >
          Iniciar Sesión
        </Button>
      </div>
    </LayoutRegister>
  );
};

export default VerifyUser;
