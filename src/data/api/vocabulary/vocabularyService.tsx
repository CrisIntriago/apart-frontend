import { useQuery } from "@tanstack/react-query";
import { get } from "../abstractApiClient";
import { useAccountStore } from "@/data/store/accountStore";

export interface VocabularyItem {
  id: number;
  word: string;
  meaning: string;
  difficulty: "easy" | "medium" | "hard";
}

export function useStudentVocabulary() {
  const { session } = useAccountStore();

  return useQuery<VocabularyItem[], unknown>({
    queryKey: ["student-vocabulary"],
    queryFn: async () => {
      const token = session?.sessionToken;
      if (!token) {
        throw new Error("Token de sesión no disponible");
      }

      const response = await get<VocabularyItem[]>({
        path: "/people/vocabulary/",
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error("No se pudo obtener el vocabulario");
      }

      return response.data;
    },
    enabled: !!session?.sessionToken,
    staleTime: 60_000,
  });
}
