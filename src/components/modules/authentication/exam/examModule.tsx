"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityModule from "@/components/modules/activity/activityModule";
import {
  ExamFinishAnswer,
  FinishExamResponse,
  useExamActivities,
  useFinishExam,
  useStartExam,
} from "@/data/api/exam/examService";
import { PATHS } from "@/constants/paths";
import LoaderComponent from "@/components/ui/loaderComponent";

interface ExamModuleProps {
  id: string;
}

function ExamModule({ id }: ExamModuleProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answers, setAnswers] = useState<ExamFinishAnswer[]>([]);
  const [finishedData, setFinishedData] = useState<FinishExamResponse | null>(
    null
  );
  const [noAttempts, setNoAttempts] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const startExamMutation = useStartExam();
  const finishExamMutation = useFinishExam();
  const activitiesQuery = useExamActivities(Number(id), false);

  useEffect(() => {
    startExamMutation.mutate(
      { examId: Number(id) },
      {
        onSuccess: (data) => {
          setExamStarted(true);

          const startedAt = new Date(data.started_at);
          const endTime = startedAt.getTime() + data.time_limit_minutes * 60 * 1000;

          const updateTimeLeft = () => {
            const now = new Date().getTime();
            const diff = Math.max(Math.floor((endTime - now) / 1000), 0);
            setTimeLeft(diff);

          };

          updateTimeLeft();
          const interval = setInterval(updateTimeLeft, 1000);
          return () => clearInterval(interval);
        },
        onError: (err: any) => {
          if (err?.data?.detail === "No attempts remaining.") {
            setNoAttempts(true);
          } else {
            alert(err?.data?.detail || "No se pudo iniciar el examen");
            router.push(PATHS.USER_COURSES.ROOT);
          }
        },
      }
    );
  }, [id]);

  useEffect(() => {
    if (!examStarted) return;

    setLoadingActivities(true);
    activitiesQuery.refetch().then((res) => {
      setActivities(res.data ?? []);
      setLoadingActivities(false);
    });
  }, [examStarted]);

  const handleSubmit = (body: any) => {
  if (activities.length === 0) return;

  const activityId = activities[currentIndex].activity.id;

  setAnswers((prev) => {
    const existingIndex = prev.findIndex(a => a.activity_id === activityId);
    if (existingIndex >= 0) {
      const newAnswers = [...prev];
      newAnswers[existingIndex] = { activity_id: activityId, input_data: body };
      return newAnswers;
    } else {
      return [...prev, { activity_id: activityId, input_data: body }];
    }
  });

  if (currentIndex + 1 < activities.length) {
    setCurrentIndex((i) => i + 1);
  } else {
    const attemptId = startExamMutation.data?.attempt_id;
    if (attemptId !== undefined && attemptId !== null) {
      handleFinishExam(attemptId);
    } else {
      alert("No se pudo obtener el attempt_id del examen.");
    }
  }
};


  const handleFinishExam = (attemptId: number) => {
    finishExamMutation.mutate(
      { examId: Number(id), attemptId, answers },
      {
        onSuccess: (data) => setFinishedData(data),
        onError: (err) => console.error("Error al finalizar el examen:", err),
      }
    );
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--:--";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (noAttempts) {
    return (
      <div className="flex w-full items-center justify-center p-8 text-black">
        <div className="bg-white border border-black rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No hay intentos disponibles</h2>
          <p className="mb-6">Has agotado todos los intentos para este examen.</p>
          <button
            className="px-6 py-2 border border-black rounded hover:bg-black hover:text-white transition-colors"
            onClick={() => router.push(PATHS.USER_COURSES.ROOT)}
          >
            Volver a mis cursos
          </button>
        </div>
      </div>
    );
  }

  if (!examStarted || loadingActivities || activitiesQuery.isLoading) {
    return <LoaderComponent />;
  }

  if (activities.length === 0) {
    return <p className="p-4 text-center">No hay actividades disponibles en este examen.</p>;
  }

  if (finishedData || timeLeft === 0) {
    return (
      <div className="flex w-full items-center justify-center p-8 text-black">
        <div className="bg-white border border-black rounded-lg shadow-lg p-14 max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">
            {timeLeft === 0 ? "Tiempo agotado" : "Examen Finalizado"}
          </h2>

          {finishedData && (
            <div className="text-left space-y-2">
              <p>
                <span className="font-semibold">Puntaje:</span>{" "}
                {finishedData.score_points} / {finishedData.max_points}
              </p>
              <p>
                <span className="font-semibold">Porcentaje:</span>{" "}
                {finishedData.percentage}%
              </p>
              <p>
                <span className="font-semibold">Preguntas correctas:</span>{" "}
                {finishedData.correct_count} / {finishedData.total_questions}
              </p>
            </div>
          )}

          <button
            className="mt-6 px-6 py-2 border border-black rounded hover:bg-black hover:text-white transition-colors"
            onClick={() => router.push(PATHS.USER_COURSES.ROOT)}
          >
            Volver a mis cursos
          </button>
        </div>
      </div>
    );
  }

  const currentActivity = activities[currentIndex].activity;

  return (
    <div className="w-full p-4 bg-[#E3E3E3] rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">Tiempo restante: {formatTime(timeLeft)}</h2>
      <h3 className="text-lg font-semibold mb-4">
        Pregunta {currentIndex + 1} de {activities.length}
      </h3>
      <ActivityModule activityData={currentActivity} onSubmit={handleSubmit} />
    </div>
  );
}

export default ExamModule;
