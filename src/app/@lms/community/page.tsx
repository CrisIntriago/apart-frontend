"use client";

import { Medal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Imagen from "@images/classmate.png";
const mockTopScores = [
  {
    id: 1,
    name: "Juan Pérez",
    avatar: Imagen,
    score: 980,
  },
  {
    id: 2,
    name: "María López",
    avatar: Imagen,
    score: 920,
  },
  {
    id: 3,
    name: "Carlos García",
    avatar: Imagen,
    score: 890,
  },
  {
    id: 4,
    name: "Ana Torres",
    avatar: Imagen,
    score: 860,
  },
  {
    id: 5,
    name: "Luis Ortega",
    avatar: Imagen,
    score: 850,
  },
];

const CommunityPage = () => {
  const courseId = 1;
  const [topUsers, setTopUsers] = useState<typeof mockTopScores>([]);

  useEffect(() => {
    setTopUsers(mockTopScores);
  }, [courseId]);

  return (
    <main className="min-h-screen bg-[#E3E3E3] py-10 px-4 flex justify-center">
      <section className="w-full max-w-xl space-y-6">
        <div className="bg-white rounded-xl shadow px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Medal size={20} className="text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-900">Top estudiantes</h2>
          </div>

          <ul className="space-y-4">
            {topUsers.map((user, index) => (
              <li
                key={user.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-700 w-5">
                    #{index + 1}
                  </span>
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">Puntaje: {user.score}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default CommunityPage;
