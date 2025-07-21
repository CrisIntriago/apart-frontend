"use client";

import Image from "next/image";
import personImage from "@images/classmate.png";

const InstagramIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-5 h-5"
  >
    <title>Instagram</title>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1.1.5 1.5.9.4.4.7.9.9 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1.1-.9 1.5-.4.4-.9.7-1.5.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1.1.9-1.5.4-.4.9-.7 1.5-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zM12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm6.4-1c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/>
  </svg>
);

const classmates = [
  {
    name: "Juan Pérez",
    country: "México",
    image: personImage,
  },
  {
    name: "Sophie Müller",
    country: "Alemania",
    image: personImage,
  },
  {
    name: "Emily Smith",
    country: "EE.UU.",
    image: personImage,
  },
  {
    name: "Laura González",
    country: "Colombia",
    image: personImage,
  },
];

const UserClassmatesInfo = () => {
  return (
    <div className="bg-[#E3E3E3] px-6 py-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
        Miembros del Nivel A1
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {classmates.map((classmate, index) => (
          <div
            key={index}
            className="bg-[#3C3939] text-white rounded-2xl shadow-lg p-4 flex flex-col items-center w-56 transition hover:scale-105"
          >
            <Image
              src={classmate.image}
              alt={`Foto de ${classmate.name}`}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-white mb-4"
            />

            <p className="text-base font-bold mb-1 text-center">
              {classmate.name}
            </p>

            <p className="text-xs text-gray-300 mb-3 text-center">
              <span className="font-semibold text-white">País:</span>{" "}
              {classmate.country}
            </p>

            <p className="text-xs font-semibold mb-1">Conócelo en:</p>

            <div className="flex items-center justify-center">
              <InstagramIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserClassmatesInfo;
