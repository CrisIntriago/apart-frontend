import { useMutation, useQuery } from "@tanstack/react-query";
import { get, ApartResponseApi, post } from "../abstractApiClient";
import { LearningActivityType, Activity } from "@/types/learning_activity";
import { useAccountStore } from "@/data/store/accountStore";

export interface ExamActivityResponse {
  activity: Activity;
  required: boolean;
  position: number;
}

export interface ExamResponse {
  id: number;
  course: number;
  type: string;
  title: string;
  description: string;
  is_published: boolean;
  time_limit_minutes: number;
  attempts_allowed: number;
  pass_mark_percent: number;
}

export interface StartExamResponse {
  attempt_id: number;
  attempt_number: number;
  time_limit_minutes: number;
  status: string;
  started_at: string;
}

export function useStartExam() {
  const { session } = useAccountStore();

  return useMutation<StartExamResponse, any, { examId: number }>({
    mutationFn: async ({ examId }) => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");

      const response = await post<StartExamResponse>({
        path: `/content/exams/${examId}/start/`,
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error(response.error || "Error al iniciar el examen");
      }

      return response.data;
    },
  });
}

export function useExamActivities(examId: number, shuffle = false) {
  const { session } = useAccountStore();

  return useQuery<ExamActivityResponse[], unknown>({
    queryKey: ["exam-activities", examId, shuffle],
    queryFn: async () => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");

      const response = await get<ExamActivityResponse[]>({
        path: `/content/exams/${examId}/activities/`,
        queryParameters: shuffle ? { shuffle: "1" } : undefined,
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error("No se pudieron obtener las actividades del examen");
      }

      return response.data;
    },
    enabled: !!examId && !!session?.sessionToken,
  });
}

export function useExamService() {
  const useExamsByCourseId = (courseId: number) =>
    useQuery<ApartResponseApi<ExamResponse[]>, unknown>({
      queryKey: ["exams", courseId],
      queryFn: async () => {
        const response = await get<ExamResponse[]>({
          path: `/content/courses/${courseId}/exams`,
        });
        console.log("Exams Response:", response);
        return response;
      },
      enabled: !!courseId,
    });

  return {
    getExamsByCourseId: useExamsByCourseId,
  };
}
