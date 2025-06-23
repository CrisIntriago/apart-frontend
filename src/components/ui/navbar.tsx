import { Bell, BookOpen, Users, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import profileImage from '../../../public/images/profile.png';

const Navbar = () => {
  return (
    <header className="w-full bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b-2 border-black">
      <div className="flex items-center space-x-8">
        <span className="text-xl font-extrabold tracking-wide text-black">APART</span>

        <nav className="flex items-center space-x-6 text-sm text-black font-bold">
          <Link href="/dashboard" className="flex items-center space-x-1 hover:underline">
            <BookOpen className="w-5 h-5 text-black" />
            <span>Aprender</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:underline">
            <Users className="w-5 h-5 text-black" />
            <span>Comunidad</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-6 text-sm text-black">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Bell className="w-5 h-5 text-black" />
          <span className="font-bold">Notificaciones</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <Link href="/profile" className="flex items-center space-x-1 cursor-pointer hover:underline">
            <User className="w-5 h-5 text-black" />
            <span className="font-bold">Perfil</span>
          </Link>
        </div>
        <div className="w-8 h-8 rounded-full border-gray-700 overflow-hidden border">
          <Image
            src={profileImage}
            alt="Foto de perfil"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </header>
  );
}
export default Navbar;