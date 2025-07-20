"use client";

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
          href="/register"
          className={`font-medium hover:opacity-80 ${isActive("/register")}`}
        >
          Registro
        </Link>
        <Link
          href="/"
          className={`font-medium hover:opacity-80 ${isActive("/")}`}
        >
          Iniciar Sesión
        </Link>
      </div>
    </header>
  );
};

export default HeaderNavigation;
