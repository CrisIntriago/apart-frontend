"use client";

import { Medal } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLeaderboardTop10 } from "@/data/api/activity/activityService";
import LoaderComponent from "@/components/ui/loaderComponent";

const timeWindows = [
  { value: "day", label: "Hoy" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
  { value: "all", label: "Todos" },
] as const;

const CommunityPage = () => {
  const { user: userData, isLoading: userLoading } = useUser();
  const [timeWindow, setTimeWindow] = useState<"day" | "week" | "month" | "all">("day");

  const { data: leaderboard = [], isLoading: leaderboardLoading } =
    useLeaderboardTop10(undefined, timeWindow);

  if (userLoading) return <LoaderComponent />;

  return (
    <main className="min-h-screen bg-[#E3E3E3] py-10 px-4 flex justify-center">
      <section className="w-full max-w-xl space-y-6">
        <div className="bg-white rounded-xl shadow px-6 py-6">
          <div className="flex flex-col items-center mb-6">
            <Medal size={28} className="text-yellow-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 text-center">
              Leaderboard global
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {timeWindows.map((tw) => (
              <button
                key={tw.value}
                onClick={() => setTimeWindow(tw.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${
                  timeWindow === tw.value
                    ? "bg-black text-white"
                    : "bg-white text-black border-gray-400 hover:bg-gray-100"
                }`}
              >
                {tw.label}
              </button>
            ))}
          </div>

          {leaderboardLoading ? (
            <LoaderComponent />
          ) : leaderboard.length === 0 ? (
            <LoaderComponent />
          ) : (
            <ul className="space-y-4">
              {leaderboard.map((user, index) => {
                const isCurrentUser = user.username === userData?.first_name;
                return (
                  <li
                    key={user.user_id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-bold w-6 text-center ${
                          index === 0
                            ? "text-yellow-500"
                            : index === 1
                            ? "text-gray-500"
                            : index === 2
                            ? "text-orange-500"
                            : "text-gray-700"
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.full_name} {isCurrentUser && "(Yo)"}
                        </p>
                        <p className="text-xs text-gray-500">Puntaje: {user.total_points}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
};

export default CommunityPage;
