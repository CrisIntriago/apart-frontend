"use client";
import Image from "next/image";
import { learningRoute } from "../../constants/apiResponseTest";
import Navbar from "../components/navbar";
const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Capítulo 1: Presentaciones</h2>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          {learningRoute.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Image
                src={activity.image}
                alt={activity.titulo}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{activity.titulo}</h3>
                <p className="text-gray-600 text-sm">{activity.subtitulo}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  activity.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {activity.status === "COMPLETED"
                  ? "Completado"
                  : "En progreso"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
