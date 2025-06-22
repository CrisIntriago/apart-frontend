"use client";

import { useModuleService } from "@/data/api/module/moduleService";
import Image from "next/image";
import Link from "next/link";

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

  return (
    
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Capítulo 1: Presentaciones</h2>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/module/${module.id}`}
              className="block"
            >
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <Image
                  src={module.image || "/default-module-image.png"}
                  alt={module.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{module.name}</h3>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  En progreso
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
