"use client";

import { PATHS } from "@/constants/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNavigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "border-b-2 border-black" : "";

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold">APART</h1>

      <div className="flex gap-4">
        <Link
          href={PATHS.REGISTER.STEP_ONE}
          className={`font-medium hover:opacity-80 ${isActive(PATHS.REGISTER.STEP_ONE)}`}
        >
          Registro
        </Link>
        <Link
          href={PATHS.LOGIN}
          className={`font-medium hover:opacity-80 ${isActive(PATHS.LOGIN)}`}
        >
          Iniciar Sesión
        </Link>
      </div>
    </header>
  );
};

export default HeaderNavigation;
