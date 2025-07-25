"use client";
import Image from "next/image";
import { MapPin } from "lucide-react";
import profileImage from '@images/profile.png';

const UserProfileHeader = ({
  activeSection,
  onSectionChange,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) => {
  const menuItems = [
    { key: "progress", label: "Progreso" },
    { key: "classmates", label: "Compañeros de curso" },
    { key: "membership", label: "Manejar membresía" },
  ];

  return (
    <div className="bg-white rounded-xl px-4 sm:pl-20 flex flex-col items-start gap-4 py-5 drop-shadow-lg w-full">
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-center sm:text-left gap-4 sm:gap-6 w-full">
        <Image
          src={profileImage}
          alt="Usuario"
          width={100}
          height={100}
          className="rounded-full object-cover mx-auto sm:mx-0"
        />
        <div>
          <h1 className="text-xl sm:text-2xl mt-2 sm:mt-4 font-bold text-gray-900">Carlos Martinez</h1>
          <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1 mt-1">
            <MapPin size={14} />
            <span>Ecuador</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-8 mt-2 w-full pt-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            className={`text-sm font-semibold ${
              activeSection === item.key
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            } pb-1 transition`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfileHeader;
