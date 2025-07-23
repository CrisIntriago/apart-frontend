"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActivityModule from "@/components/modules/activity/activityModule";
import { useActivitiesByModule, useSubmitActivity } from "@/data/api/activity/activityService";
import Module from "module";

function ModuleMod({ id }: { id: string }) {
  const courseId = 1;
  const moduleId = Number(id);

  const activitiesQuery = useActivitiesByModule(courseId, moduleId);
  const submitMutation = useSubmitActivity();

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleSubmit = (body: any) => {
    const activityId = activitiesQuery.data![currentIndex].id;
    submitMutation.mutate(
      { activityId, body },
      {
        onSuccess: (res) => {
          console.log("Respuesta del backend:", res);
          console.log(res.is_correct ? "Respuesta correcta" : "Respuesta incorrecta");
          if (currentIndex + 1 < activitiesQuery.data!.length) {
            setCurrentIndex((i) => i + 1);
          } else {
            console.log("¡Módulo completado!");
            router.push("/dashboard");
          }
        },
        onError: (error) => {
          console.error("Error en la petición:", error);
          alert("Ocurrió un error al enviar la respuesta.");
        }
      }
    );
  };

  if (activitiesQuery.isLoading) return <p className="p-4">Cargando actividades...</p>;
  if (!activitiesQuery.data || activitiesQuery.data.length === 0) return <p>No hay actividades disponibles.</p>;

  const currentActivity = activitiesQuery.data[currentIndex];

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">
        Actividad {currentIndex + 1} de {activitiesQuery.data.length}
      </h2>
      <ActivityModule activityData={currentActivity} onSubmit={handleSubmit} />
    </div>
  );
}
export default ModuleMod;