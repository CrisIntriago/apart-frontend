import { Bell, BookOpen, Users, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
      
      <div className="flex items-center space-x-8">
        <span className="text-xl font-extrabold tracking-wide">APART</span>

        <nav className="flex items-center space-x-6 text-sm text-gray-800">
          <Link href="#" className="flex items-center space-x-1 hover:underline">
            <BookOpen className="w-4 h-4 text-gray-600" />
            <span>Aprender</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:underline">
            <Users className="w-4 h-4 text-gray-600" />
            <span>Comunidad</span>
          </Link>
        </nav>
      </div>

     
      <div className="flex items-center space-x-6 text-sm text-gray-800">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Bell className="w-4 h-4 text-gray-500" />
          <span>Notificaciones</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <User className="w-4 h-4 text-gray-500" />
          <span>Perfil</span>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border">
          <Image
            src="/default-user.svg"
            alt="Foto de perfil"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
