"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActivityModule from "@/components/modules/activity/activityModule";
import { useActivitiesByModule, useSubmitActivity } from "@/data/api/activity/activityService";
import ModuleSummary from "./ModuleSummary";
import { PATHS } from "@/constants/paths";
import LoaderComponent from "@/components/ui/loaderComponent";

function ModuleMod({ id }: { id: string }) {
  const courseId = 1;
  const moduleId = Number(id);
  const router = useRouter();

  const activitiesQuery = useActivitiesByModule(courseId, moduleId);
  const submitMutation = useSubmitActivity();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ is_correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = (body: any) => {
    const activityId = activitiesQuery.data![currentIndex].id;

    submitMutation.mutate(
      { activityId, body },
      {
        onSuccess: (res) => {
          setResults((prev) => [...prev, { is_correct: res.is_correct }]);

          if (currentIndex + 1 < activitiesQuery.data!.length) {
            setCurrentIndex((i) => i + 1);
          } else {
            setIsFinished(true);
          }
        },
        onError: (error) => {
          console.error("Error en la petición:", error);
        },
      }
    );
  };

  if (activitiesQuery.isLoading) return <LoaderComponent />
  ;
  if (!activitiesQuery.data || activitiesQuery.data.length === 0) return <p>No hay actividades disponibles.</p>;

  if (isFinished) {
    return (
      <ModuleSummary
        results={results}
        activities={activitiesQuery.data}
        onBack={() => router.push(PATHS.USER_COURSES.ROOT)}
      />
    );
  }

  const currentActivity = activitiesQuery.data[currentIndex];

  return (
    <div className="w-full p-4 bg-[#E3E3E3] text-center rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Actividad {currentIndex + 1} de {activitiesQuery.data.length}
      </h2>
      <ActivityModule activityData={currentActivity} onSubmit={handleSubmit} />
    </div>
  );
}

export default ModuleMod;
