"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityModule from "@/components/modules/activity/activityModule";
import { useSubmitActivity } from "@/data/api/activity/activityService";
import { useExamActivities, useStartExam } from "@/data/api/exam/examService";
import { PATHS } from "@/constants/paths";

interface ExamModuleProps {
  id: string;
}

function ExamModule({ id }: ExamModuleProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ is_correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const startExamMutation = useStartExam();
  const submitMutation = useSubmitActivity();

  useEffect(() => {
    startExamMutation.mutate(
      { examId: Number(id) },
      {
        onSuccess: () => setExamStarted(true),
        onError: (err: any) => {
          alert(err?.data?.detail || "No se pudo iniciar el examen");
          router.push(PATHS.USER_COURSES.ROOT);
        },
      }
    );
  }, [id]);

  const activitiesQuery = useExamActivities(Number(id), true);

  const activities = examStarted ? activitiesQuery.data ?? [] : [];

  const handleSubmit = (body: any) => {
    if (activities.length === 0) return;

    const activityId = activities[currentIndex].activity.id;

    submitMutation.mutate(
      { activityId, body },
      {
        onSuccess: (res) => {
          setResults((prev) => [...prev, { is_correct: res.is_correct }]);

          if (currentIndex + 1 < activities.length) {
            setCurrentIndex((i) => i + 1);
          } else {
            setIsFinished(true);
          }
        },
        onError: (error) => console.error("Error en la petición:", error),
      }
    );
  };

  if (startExamMutation.isPending || !examStarted) {
    return <p className="p-4">Iniciando el examen...</p>;
  }

  if (activitiesQuery.isLoading) {
    return <p className="p-4">Cargando actividades del examen...</p>;
  }

  if (activities.length === 0) {
    return <p>No hay actividades disponibles en este examen.</p>;
  }

  if (isFinished) {
    return <> </>;
  }

  const currentActivity = activities[currentIndex].activity;

  return (
    <div className="w-full p-4 bg-[#E3E3E3] rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Actividad {currentIndex + 1} de {activities.length}
      </h2>
      <ActivityModule activityData={currentActivity} onSubmit={handleSubmit} />
    </div>
  );
}

export default ExamModule;
