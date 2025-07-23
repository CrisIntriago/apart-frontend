import { useQuery } from "@tanstack/react-query";
import { get, ApartResponseApi } from "../abstractApiClient";

export interface ModuleResponse {
  id: number;
  name: string;
  description: string;
  image: string;
}

export function useModuleService() {
  const useModulesByCourseId = (courseId: number) =>
    useQuery<ApartResponseApi<ModuleResponse[]>, unknown>({
      queryKey: ['modules', courseId],
      queryFn: async () => {
        const response = await get<ModuleResponse[]>({
          path: `/content/courses/${courseId}/modules`,
        });
        return response;
      },
      enabled: !!courseId,
    });

  return {
    getModulesByCourseId: useModulesByCourseId,
  };
}
