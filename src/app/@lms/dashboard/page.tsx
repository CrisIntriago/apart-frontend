"use client";
import Image from "next/image";
import Link from "next/link";
import { learningRoute } from "@/constants/apiResponseTest";

const DashboardPage = () => {
  return (
    
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="inline-block bg-white px-4 py-2 rounded-lg shadow">
            <span className="text-sm font-medium text-gray-700">📘 Principiante A1</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Capítulo 1: Presentaciones</h2>
          <div className="relative border-l-2 border-black ml-6 space-y-10">
            {learningRoute.map((activity) => (
              <Link key={activity.id} href={`/activity/${activity.id}`} className="block group">
                <div className="flex items-start gap-4 relative pl-6">
                  {/* Punto con imagen */}
                  <div className="absolute -left-[22px] top-0 w-11 h-11 rounded-full border-2 border-black overflow-hidden bg-white shadow">
                    <Image
                      src={activity.image}
                      alt={activity.titulo}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-md font-bold text-gray-800 group-hover:underline">{activity.titulo}</h3>
                    <p className="text-sm text-gray-600">{activity.subtitulo}</p>
                  </div>

                  {/* Estado */}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap self-start ${
                      activity.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status === "COMPLETED" ? "Completado" : "En progreso"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
