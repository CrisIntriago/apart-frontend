"use client";

import { PATHS } from "@/constants/paths";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/data/api/auth/authService";
import { removeSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { removeAccountState } from "@/data/store/accountStore";
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function NotCourseAssignedPage() {
  const router = useRouter();
  const { logout } = useAuthService();

  useEffect(() => {
      router.replace(PATHS.NOT_COURSE_ASIGNED);
    }, [router]);

  const handleLogoutAndRedirect = async () => {
    try {
      await logout.mutateAsync();
      removeAccountState();
      await removeSessionStorageCookies();
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h2 className="text-xl font-bold mb-4">Sin curso asignado</h2>
        <p className="mb-6">
          Tu cuenta aún no tiene un curso asignado.<br />
          Por favor comunícate con tu profesor para que te asigne uno.
        </p>

        <Button
          onClick={handleLogoutAndRedirect}
          variant="contained"
          
          className="bg-black hover:bg-gray-900 text-white"
        >
          Regresar a inicio de sesión
        </Button>
      </div>
    </div>
  );
}
