"use client";
import Image from "next/image";
import profileImage from '../../../../public/images/profile.png';
import courseImage from '../../../../public/images/london.jpg';

const UserProfileContent = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <Image
          src={profileImage}
          alt="Usuario"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carlos Martinez</h1>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <span>Ecuador</span>
          </p>
        </div>
      </div>

      <div className="bg-[#E3E3E3] rounded-xl p-6">
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-900">Curso Actual</h2>
            <div className="bg-[#3B3939] text-white rounded-xl p-4 mx-20 text-center">
              <p className="text-sm mb-2"><span className="font-semibold">Nivel: A1</span></p>
              <div className="flex justify-center my-4">
                <Image
                  src={courseImage}
                  alt="Curso de inglés"
                  width={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-sm mb-4">
                Learn English vocabulary and grammar in this comprehensive course for all
              </p>
              <div className="w-full text-center mt-4">
                <button className="border border-white rounded-full px-6 py-1 hover:bg-white hover:text-gray-900 transition">
                  Entrar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold border-b w-full text-center pb-2 text-gray-900 mb-4">
              Tu progreso del curso actual
            </h2>
            <div className="relative w-40 h-40 mb-4">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
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
                  strokeDasharray="20, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-900">
                20%
              </div>
            </div>
            <p className="text-sm mb-1 text-gray-900">Nivel A1</p>
            <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
              <span>📈</span> Vocabulario aprendido
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfileContent;
