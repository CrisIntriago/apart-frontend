"use client";

import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import LayoutRegister from "@/components/modules/authentication/register/LayoutRegister";
import { useRegister } from "@/context/RegisterContext";
import { PATHS } from "@/constants/paths";

const VerifyUser = () => {
  const router = useRouter();
  const { formData } = useRegister();

  return (
    <LayoutRegister>
      <div className="bg-white px-6 py-10 rounded-xl shadow-md text-center space-y-6 max-w-md mx-auto">
        <Typography variant="h5" className="font-bold">
          Tu cuenta ha sido creada exitosamente.
        </Typography>

        <Typography className="text-sm text-gray-600">
          Notifica a tu profesor para que te inscriba en el curso correspondiente con el siguiente email: <br />
          <strong>{formData.email}</strong> para poder acceder a la plataforma.
          Si ya fuiste inscrito previamente, inicia sesión.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          className="bg-black text-white"
          onClick={() => router.push(PATHS.LOGIN)}
        >
          Iniciar Sesión
        </Button>
      </div>
    </LayoutRegister>
  );
};

export default VerifyUser;
