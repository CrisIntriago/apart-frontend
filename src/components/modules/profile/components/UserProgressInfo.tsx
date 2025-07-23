"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import courseImage from "@images/london.jpg";
import usaFlag from "@images/usa-flag.png";

const UserProgressInfo = () => {
  const progress = 20;
  const circumference = 100;
  const dashArray = `${progress}, ${circumference}`;

  return (
    <div className="bg-[#E3E3E3] py-8 px-4 sm:px-8 md:px-16 xl:px-52">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-28">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Curso Actual
          </h2>
          <div className="w-full border-b-2 border-black mb-4"></div>

          <div className="bg-[#3B3939] text-white rounded-lg p-4 w-full max-w-xs mx-auto text-center">
            <div className="flex items-center mb-2 justify-center">
              <Image
                src={usaFlag}
                alt="USA Flag"
                width={20}
                height={15}
                className="mr-2 rounded-sm"
              />
              <p className="text-xs font-semibold">Nivel: A1</p>
            </div>

            <p className="text-xs mb-4">
              Learn English vocabulary and grammar in this comprehensive course
              for all
            </p>

            <Image
              src={courseImage}
              alt="Curso de inglés"
              width={220}
              className="rounded-lg object-cover mx-auto my-4"
            />

            <button className="border border-white rounded-full px-12 sm:px-20 py-1 text-xs hover:bg-white hover:text-gray-900 transition mx-auto block">
              Entrar
            </button>
          </div>
        </div>

        {/* Progreso del curso */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-base font-semibold text-gray-900 w-full text-left mb-2">
            Tu progreso del curso actual
          </h2>
          <div className="w-full border-b-2 border-black mb-4"></div>

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={dashArray}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-gray-900">
              {progress}%
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <Image
              src={usaFlag}
              alt="USA Flag"
              width={20}
              height={15}
              className="rounded-sm"
            />
            <p className="text-sm font-medium text-gray-900">Nivel A1</p>
          </div>

          <div className="w-full border-b-2 border-black mb-3"></div>

          <p className="text-xs font-semibold text-gray-900 underline flex items-center gap-1">
            <TrendingUp size={14} />
            Vocabulario aprendido
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserProgressInfo;
