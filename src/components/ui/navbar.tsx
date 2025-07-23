"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, BookOpen, Users, User, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "@images/profile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b-2 border-black font-guru">
      
      <div className="flex items-center space-x-8">
          <Link href="/" className="text-3xl sm:text-4xl font-bold" aria-label="Ir al inicio">
            APART
          </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm text-black font-bold">
          <Link
            href="/dashboard"
            className={`flex items-center space-x-1 ${
              isActive("/dashboard") ? "underline" : "hover:underline"
            }`}
          >
            <BookOpen className="w-5 h-5 text-black" />
            <span>Aprender</span>
          </Link>
          <Link
            href="/community"
            className={`flex items-center space-x-1 ${
              isActive("/community") ? "underline" : "hover:underline"
            }`}
          >
            <Users className="w-5 h-5 text-black" />
            <span>Comunidad</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-6 text-sm text-black font-bold">
        <div className="hidden md:flex items-center space-x-2 cursor-pointer">
          <Bell className="w-5 h-5 text-black" />
          <span>Notificaciones</span>
        </div>
        <Link
          href="/profile"
          className={`hidden md:flex items-center space-x-2 ${
            isActive("/profile") ? "underline" : "hover:underline"
          }`}
        >
          <User className="w-5 h-5 text-black" />
          <span>Perfil</span>
        </Link>

        <div className="w-8 h-8 rounded-full border-gray-700 overflow-hidden border">
          <Image
            src={profileImage}
            alt="Foto de perfil"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-black flex flex-col space-y-4 py-4 px-6 md:hidden">
          <Link href="/dashboard" className="flex items-center space-x-2 font-bold text-black">
            <BookOpen className="w-5 h-5" />
            <span>Aprender</span>
          </Link>
          <Link href="/community" className="flex items-center space-x-2 font-bold text-black">
            <Users className="w-5 h-5" />
            <span>Comunidad</span>
          </Link>
          <div className="flex items-center space-x-2 font-bold text-black">
            <Bell className="w-5 h-5" />
            <span>Notificaciones</span>
          </div>
          <Link href="/profile" className="flex items-center space-x-2 font-bold text-black">
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
