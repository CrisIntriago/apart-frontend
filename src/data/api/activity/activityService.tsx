import { useQuery } from "@tanstack/react-query";
import { ApartResponseApi, get } from "../abstractApiClient";

interface SendPogressResponse {
    token: string;
    user: any;
}

interface ActivityResponse {
  id: number;
  type: 'choice' | string;
  title: string;
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  payload: string;
}


export function useActivityService() {
  const updateContentQuery = useQuery<ApartResponseApi<ActivityResponse[]>, unknown>({
    queryKey: ['activities'],  
    queryFn: async () => {
      const response = await get<ActivityResponse[]>({
        path: "/activities",
      });
      return response;
    }
  });

  return {
    sendProgress: updateContentQuery,
  };
}