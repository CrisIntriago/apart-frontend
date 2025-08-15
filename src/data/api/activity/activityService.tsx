import { useQuery, useMutation } from "@tanstack/react-query";
import { get, post, ApartResponseApi } from "../abstractApiClient";
import { Activity } from "@/types/learning_activity";
import { useAccountStore } from "@/data/store/accountStore";

interface SubmitResponse {
  is_correct: boolean;
}

type ChoiceAnswer = { selected_ids: number[] };
type FillAnswer = { answers: Record<string, string> };
type MatchingAnswer = { pairs: Record<string, string> };
type OrderAnswer = { words: string[] };

export type ActivitySubmissionBody =
  | ChoiceAnswer
  | FillAnswer
  | MatchingAnswer
  | OrderAnswer;

export interface LeaderboardEntry {
  user_id: number;
  username: string;
  full_name: string;
  total_points: number;
  activities_count: number;
  position: number;
}

export function useLeaderboardTop10(
  moduleId?: number,
  timeWindow: "day" | "week" | "month" | "all" = "all"
) {
  const { session } = useAccountStore();

  return useQuery<LeaderboardEntry[], unknown>({
    queryKey: ["leaderboard-top10", moduleId, timeWindow],
    queryFn: async () => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");

      const response = await get<LeaderboardEntry[]>({
        path: `/activities/leaderboard/top10/`,
        queryParameters: {
          ...(moduleId ? { module_id: moduleId.toString() } : {}),
          time_window: timeWindow,
        },
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      return response.data ?? [];
    },
    enabled: !!session?.sessionToken,
  });
}

export function useActivitiesByModule(courseId: number, moduleId: number) {
  return useQuery<Activity[], unknown>({
    queryKey: ['activities-by-module', courseId, moduleId],
    queryFn: async () => {
      const response = await get<Activity[]>({
        path: `/content/courses/${courseId}/modules/${moduleId}/activities/`,
      });
      return response.data ?? [];
    },
    enabled: !!courseId && !!moduleId,
  });
}

export function useSubmitActivity() {
  const { session } = useAccountStore();

  return useMutation({
    mutationFn: async ({
      activityId,
      body,
    }: {
      activityId: number;
      body: ActivitySubmissionBody;
    }) => {
      const token = session?.sessionToken;
      if (!token) {
        throw new Error("Token de sesión no disponible");
      }

      const response = await post<SubmitResponse>({
        path: `/activities/${activityId}/submit/`,
        body,
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error("No data returned from submitActivityAnswer");
      }

      return response.data;
    },
  });
}