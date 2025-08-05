"use client";

import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Chip,
  Autocomplete,
  Typography,
} from "@mui/material";
import { useRegister } from "@/context/RegisterContext";
import { useState, useEffect } from "react";
import LayoutRegister from "@/components/modules/authentication/register/LayoutRegister";
import { useAuthService } from "@/data/api/auth/authService";
import { PATHS } from "@/constants/paths";

const countryOptions = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba",
  "Ecuador", "El Salvador", "España", "Guatemala", "Honduras", "México",
  "Nicaragua", "Panamá", "Paraguay", "Perú", "Uruguay", "Venezuela",
];

const languageOptions = [
  "Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués", "Ruso",
  "Japonés", "Chino", "Árabe",
];

const LanguageSelector = ({
  selectedLanguages,
  onChange,
}: {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}) => {
  const handleToggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onChange(selectedLanguages.filter((l) => l !== language));
    } else if (selectedLanguages.length < 3) {
      onChange([...selectedLanguages, language]);
    }
  };

  return (
    <div className="space-y-3">
      <Typography className="font-semibold">
        Idiomas que hablas (máx. 3)
      </Typography>

      <div className="flex flex-wrap gap-2">
        {languageOptions.map((lang) => (
          <Button
            key={lang}
            variant={
              selectedLanguages.includes(lang) ? "contained" : "outlined"
            }
            color="primary"
            size="small"
            onClick={() => handleToggleLanguage(lang)}
            disabled={
              !selectedLanguages.includes(lang) &&
              selectedLanguages.length >= 3
            }
            className="normal-case"
          >
            {lang}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedLanguages.map((lang) => (
          <Chip
            key={lang}
            label={lang}
            color="primary"
            onDelete={() => handleToggleLanguage(lang)}
          />
        ))}
      </div>
    </div>
  );
};

const StepTwo = () => {
  const router = useRouter();
  const { formData, setFormData } = useRegister();
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuthService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedLanguages = formData.languages
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    if (selectedLanguages.length < 1) {
      setErrorMessage("Selecciona al menos un idioma.");
      return;
    }

    setErrorMessage("");

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      national_id: "00000000",
      country: formData.country,
      date_of_birth: formData.birthDate,
      languages: selectedLanguages,
    };

    console.log("Payload to register:", payload);
    register.mutate(payload, {
      onSuccess: (response) => {
        const token = response.data?.token;
        if (token) {
          router.push(PATHS.REGISTER.VERIFY_USER);
        } else {
          setErrorMessage("Hubo un error al registrarte. Intenta nuevamente.");
        }
      },
      onError: () => {
        setErrorMessage("Hubo un error al registrarte. Inténtalo más tarde.");
      },
    });
  };

  const handleBack = () => {
    router.push(PATHS.USER_COURSES.ROOT);
  };

  return (
    <LayoutRegister>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 py-6 rounded-xl max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Tu información personal
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Nombre"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                InputProps={{ style: { backgroundColor: "#E3E3E3" } }}
              />

              <TextField
                label="Apellido"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                InputProps={{ style: { backgroundColor: "#E3E3E3" } }}
              />

              <TextField
                label="Fecha de nacimiento"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthDate: e.target.value,
                  }))
                }
                InputProps={{ style: { backgroundColor: "#E3E3E3" } }}
              />

              <Autocomplete
                options={countryOptions}
                value={formData.country}
                onChange={(_, newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: newValue ?? "",
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="País"
                    required
                    InputProps={{
                      ...params.InputProps,
                      style: { backgroundColor: "#E3E3E3" },
                    }}
                  />
                )}
              />
            </div>

            <LanguageSelector
              selectedLanguages={formData.languages
                .split(",")
                .map((l) => l.trim())
                .filter(Boolean)}
              onChange={(newLanguages) =>
                setFormData((prev) => ({
                  ...prev,
                  languages: newLanguages.join(","),
                }))
              }
            />
          </div>

        </div>

        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outlined"
            fullWidth
            onClick={handleBack}
            className="text-black border-black"
          >
            Atrás
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-black text-white"
          >
            Finalizar
          </Button>
        </div>

        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            className="mt-4 text-center"
          >
            {errorMessage}
          </Typography>
        )}
      </form>
    </LayoutRegister>
  );
};

export default StepTwo;
