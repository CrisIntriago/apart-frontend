"use client";

import { useRouter } from "next/navigation";
import { TextField, Button, Divider } from "@mui/material";
import { useRegister } from "@/context/RegisterContext";
import LayoutRegister from "@/components/modules/authentication/register/LayoutRegister";
import { PATHS } from "@/constants/paths";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthService } from "@/data/api/auth/authService";
import { useState } from "react";
import { handleLoginSuccess } from "@/utils/sessionHandlerUtils";

const StepOne = () => {
  const router = useRouter();
  const { formData, setFormData } = useRegister();
  const { register } = useAuthService();
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(PATHS.REGISTER.STEP_TWO);
  };

  const _handleRegisterGoogle = (credentialResponse: any) => {
      if (credentialResponse.credential) {
        register.mutate(
          { google_token: credentialResponse.credential },
          {
            onSuccess: () => handleLoginSuccess,
            onError: (error) => {
              console.error("Error al iniciar sesión:", error);
              setErrorMessage("Correo o contraseña incorrectos");
            },
          }
        );
      }
    }

  return (
    <LayoutRegister>
      <form
        onSubmit={handleNext}
        className="space-y-4 bg-white px-6 py-2 rounded-xl"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center">Crea tu cuenta</h2>

         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ""}>
            <GoogleLogin
              onSuccess={(credentialResponse) => _handleRegisterGoogle(credentialResponse)}
              onError={() => console.log('Login Failed')}
              useOneTap
            />
            <Divider className="my-4">o</Divider>
          </GoogleOAuthProvider>


        <TextField
          label="Nombre de usuario"
          fullWidth
          required
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          InputProps={{
            style: { backgroundColor: "#E3E3E3" },
          }}
        />

        <TextField
          label="Correo electrónico"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          InputProps={{
            style: { backgroundColor: "#E3E3E3" },
          }}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
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
          Siguiente
        </Button>
      </form>
    </LayoutRegister>
  );
};

export default StepOne;
