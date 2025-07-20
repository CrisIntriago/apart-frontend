"use client";

import { Bell, BookOpen, Users, User, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import profileImage from "../../../public/images/profile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b-2 border-black">
      <span className="text-xl font-extrabold tracking-wide text-black">
        APART
      </span>

      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6 text-sm text-black font-bold">
          <Link
            href="/dashboard"
            className="flex items-center space-x-1 hover:underline"
          >
            <BookOpen className="w-5 h-5 text-black" />
            <span>Aprender</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-1 hover:underline"
          >
            <Users className="w-5 h-5 text-black" />
            <span>Comunidad</span>
          </Link>
          <div className="flex items-center space-x-1 cursor-pointer">
            <Bell className="w-5 h-5 text-black" />
            <span className="font-bold">Notificaciones</span>
          </div>
          <Link
            href="/profile"
            className="flex items-center space-x-1 cursor-pointer hover:underline"
          >
            <User className="w-5 h-5 text-black" />
            <span className="font-bold">Perfil</span>
          </Link>
        </nav>

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
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 font-bold text-black"
          >
            <BookOpen className="w-5 h-5" />
            <span>Aprender</span>
          </Link>
          <Link
            href="#"
            className="flex items-center space-x-2 font-bold text-black"
          >
            <Users className="w-5 h-5" />
            <span>Comunidad</span>
          </Link>
          <div className="flex items-center space-x-2 font-bold text-black">
            <Bell className="w-5 h-5" />
            <span>Notificaciones</span>
          </div>
          <Link
            href="/profile"
            className="flex items-center space-x-2 font-bold text-black"
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
