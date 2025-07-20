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
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1.1.5 1.5.9.4.4.7.9.9 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1.1-.9 1.5-.4.4-.9.7-1.5.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1.1.9-1.5.4-.4.9-.7 1.5-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 0 5.7 0 4.6.2 3.7.5c-.9.4-1.7.9-2.4 1.6C.6 3.2.1 4 .5 3.7.2 4.6 0 5.7 0 7c0 1.3 0 1.7.1 5s0 3.6.1 5c.1 1.3.3 2.4.6 3.3.4.9.9 1.7 1.6 2.4.7.7 1.5 1.2 2.4 1.6.9.3 2 .5 3.3.6 1.3.1 1.7.1 5 .1s3.6 0 5-.1c1.3-.1 2.4-.3 3.3-.6.9-.4 1.7-.9 2.4-1.6.7-.7 1.2-1.5 1.6-2.4.3-.9.5-2 .6-3.3.1-1.3.1-1.7.1-5s0-3.6-.1-5c-.1-1.3-.3-2.4-.6-3.3-.4-.9-.9-1.7-1.6-2.4-.7-.7-1.5-1.2-2.4-1.6-.9-.3-2-.5-3.3-.6-1.3-.1-1.7-.1-5-.1zM12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.2c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z"/>
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
    <div className="bg-[#E3E3E3] min-h-screen px-20 py-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Miembros del Nivel A1
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classmates.map((classmate, index) => (
          <div
            key={index}
            className="bg-[#3C3939] text-white rounded-xl shadow p-6 flex h-44 max-w-xs"
          >
            <div className="flex items-center">
              <Image
                src={classmate.image}
                alt={`Foto de ${classmate.name}`}
                width={70}
                height={70}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-col justify-between pl-3 py-1 w-full">
              <p className="text-base font-bold">{classmate.name}</p>

              <p className="text-xs">
                <span className="font-semibold">País:</span> {classmate.country}
              </p>

              <p className="text-xs font-semibold">Conócelo en:</p>
              <div>
                <InstagramIcon/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserClassmatesInfo;
