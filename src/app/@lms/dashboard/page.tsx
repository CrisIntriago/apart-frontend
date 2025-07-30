"use client";

import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useModuleService } from "@/data/api/module/moduleService";
import LeccionImage from "@images/clip-path.png";
const DashboardPage = () => {
  const courseId = 1;
  const { getModulesByCourseId } = useModuleService();
  const { data, isLoading, error } = getModulesByCourseId(courseId);

  if (isLoading) {
    return <p className="p-6">Cargando módulos...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Error al cargar los módulos.</p>;
  }

  const modules = data?.data ?? [];
  const progress = 40;

  return (
    <main className="min-h-screen bg-[#E3E3E3] py-10 px-4 flex justify-center">
      <section className="w-full max-w-xl space-y-8">
        <div className="bg-white rounded-xl shadow flex items-center gap-2 px-8 py-3">
          <AlignJustify size={18} />
          <span className="text-sm font-semibold text-gray-800">
            Principiante A1
          </span>
        </div>

        <div className="bg-white rounded-xl shadow px-8 py-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Capítulo 1: Presentaciones
          </h2>

          <div className="w-full border-black border-2 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="h-full bg-[#996C52]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="relative ml-10">
            <div className="absolute top-0 left-[40px] w-0.5 bg-black h-full z-0"></div>

            <div className="flex flex-col space-y-8">
              {modules.map((module, index) => (
                <Link
                  key={module.id}
                  href={`/module/${module.id}`}
                  className="flex items-center gap-4 relative bg-white p-3 rounded-xl transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100 hover:scale-[1.02]"
                >
                  <div className="relative z-10">
                    <Image
                      src={module.image || "/default-module-image.png"}
                      alt={module.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover border-2 border-black"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900">
                      {module.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {module.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow px-14 py-4 flex items-center gap-4">
          <Image
            src={LeccionImage}
            alt="Refuerzo del capítulo"
            width={45}
            height={45}
            className="rounded-xl object-cover"
          />

          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Lección: Refuerzo
            </h3>
            <p className="text-sm text-gray-600">
              Afianza tus conocimientos del capítulo 1 con esta lección extra.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
