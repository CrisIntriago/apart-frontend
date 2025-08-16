"use client";

import { useRouter } from "next/navigation";
import { useRegister } from "@/context/RegisterContext";
import LayoutRegister from "@/components/modules/authentication/register/LayoutRegister";
import { PATHS } from "@/constants/paths";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthService } from "@/data/api/auth/authService";
import { useState } from "react";
import { handleLoginSuccess } from "@/utils/sessionHandlerUtils";
import { TextField, Button, Divider, Typography } from "@mui/material";
import { validatePassword } from "@/utils/validatePassword";

const StepOne = () => {
  const router = useRouter();
  const { formData, setFormData } = useRegister();
  const { register } = useAuthService();
  const [errorMessage, setErrorMessage] = useState("");
  const { validateEmail } = useAuthService();


  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    try {
      const res = await validateEmail.mutateAsync({ email: formData.email });

      if (res.data?.exists) {
        setErrorMessage("Ya existe una cuenta con este correo electrónico.");
        return;
      }

      router.push(PATHS.REGISTER.STEP_TWO);
    } catch (error) {
      setErrorMessage("Error al validar el correo. Intenta de nuevo.");
    }
  };


  const _handleRegisterGoogle = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      register.mutate(
        { google_token: credentialResponse.credential },
        {
          onSuccess: (response) => {
            const username = response.data!.user.username || "";
            const [firstName, ...rest] = username.split(" ");
            const lastName = rest.join(" ");
            setFormData((prev) => ({
              ...prev,
              username,
              email: response.data!.user.email,
              password: response.data!.user.password,
              firstName: firstName || "",
              lastName: lastName || "",
            }));
            router.push(PATHS.REGISTER.STEP_TWO);
          },
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

        <div className="w-full">

          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ""}>
            <div className="w-full">

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  _handleRegisterGoogle(credentialResponse);
                  console.log("Google login successful:", credentialResponse);
                }}
                onError={() => console.log('Login Failed')}
                useOneTap
              />
            </div>
            <Divider className="my-4">o</Divider>
          </GoogleOAuthProvider>
        </div>


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
          disabled={validateEmail.isPending}
          className="bg-black hover:bg-gray-900 text-white"
        >
          {validateEmail.isPending ? "Validando..." : "Siguiente"}
        </Button>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: "center" }}>
            {errorMessage}
          </Typography>
        )}
      </form>
    </LayoutRegister>
  );
};

export default StepOne;
