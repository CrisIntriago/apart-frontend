"use client";
import { PATHS, PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/paths";
import {
  accountStore,
  removeAccountState,
  useAccountStore,
} from "@/data/store/accountStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderComponent from "@/components/ui/loaderComponent";
import { useUser } from "@/context/UserContext";
import { removeSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useAccountStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const { user } = useUser();

  const checkValidRoute = async () => {
    console.log("Verificando ruta válida, pathname para user:", user);
    if (!session.uid && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace(PATHS.LOGIN);
      return;
    } else if (
      user &&
      typeof user === "object" &&
      "detail" in user &&
      user.detail === "Invalid token."
    ) {
      removeAccountState();
      await removeSessionStorageCookies();
      router.replace(PATHS.LOGIN);
      return;
    } else if (
      user &&
      typeof user === "object" &&
      "detail" in user &&
      user.detail === "No hay perfil de estudiante asociado."
    ) {
      router.replace(PATHS.NOT_COURSE_ASIGNED);
      return;
    }
  };

  useEffect(() => {
    if (isHydrated) {
      checkValidRoute();
    }
  }, [pathname, isHydrated, user]);

  useEffect(() => {
    if (!isHydrated) {
      accountStore.persist.rehydrate()?.then(() => {
        setIsHydrated(true);
      });
    }
  }, []);

  return isHydrated ? <>{children}</> : <LoaderComponent />;
};

export default AuthGuard;
