"use client";

import { PATHS } from "@/constants/paths";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/data/api/auth/authService";
import { removeSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";
import { removeAccountState } from "@/data/store/accountStore";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { PlanCard } from "@/components/suscriptions/planCard";
import { plans } from "@/constants/suscriptionPlans";

export default function NotCourseAssignedPage() {
  const router = useRouter();
  const { logout } = useAuthService();

  const { user, isLoading } = useUser();
  const email = user?.email;

  const stripeUrl =
  "https://billing.stripe.com/p/login/test_3cIcMYf8I7G23Mzb8VeEo00" +
  (email ? `?prefilled_email=${email}` : "");

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
