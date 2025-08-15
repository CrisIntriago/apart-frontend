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
  type: "MIDTERM" | "FINAL" | string;
  title: string;
  description: string;
  is_published: boolean;
  time_limit_minutes: number;
  attempts_allowed: number;
  pass_mark_percent: number;
  has_attempts_left: boolean;
  remaining_attempts: number;
  user_last_attempt_at: string;
  user_percentage: string;
  user_passed: boolean;
}

export interface StartExamResponse {
  attempt_id: number;
  attempt_number: number;
  time_limit_minutes: number;
  status: string;
  started_at: string;
}
export interface ExamFinishAnswer {
  activity_id: number;
  input_data: Record<string, any>;
}

export interface FinishExamResponse {
  attempt_id: number;
  exam_id: number;
  status: "PASSED" | "FAILED" | "IN_PROGRESS";
  score_points: number;
  max_points: number;
  percentage: number;
  passed: boolean;
  correct_count: number;
  total_questions: number;
  finished_at: string;
}

export function useFinishExam() {
  const { session } = useAccountStore();

  return useMutation<
    FinishExamResponse,
    any,
    { examId: number; attemptId: number; answers: ExamFinishAnswer[] }
  >({
    mutationFn: async ({ examId, attemptId, answers }) => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");

      const response = await post<FinishExamResponse>({
        path: `/content/exams/${examId}/finish/`,
        body: { attempt_id: attemptId, answers },
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error(response.error || "Error al finalizar el examen");
      }

      return response.data;
    },
  });
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
  const { session } = useAccountStore();
  const useExamsByCourseId = (courseId: number) =>
    useQuery<ApartResponseApi<ExamResponse[]>, unknown>({
      queryKey: ["exams", courseId],
      queryFn: async () => {
        const token = session?.sessionToken;
        if (!token) throw new Error("Token de sesión no disponible");

        const response = await get<ExamResponse[]>({
          path: `/content/courses/${courseId}/exams`,
          config: {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        });
        console.log("Exams Response:", response);
        return response;
      },
      enabled: !!courseId,
      refetchOnWindowFocus: true,
      refetchOnMount: "always",
    });

  return {
    getExamsByCourseId: useExamsByCourseId,
  };
}
