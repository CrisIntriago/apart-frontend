import { useQuery } from "@tanstack/react-query";
import { get, ApartResponseApi } from "../abstractApiClient";
import { useAccountStore } from "@/data/store/accountStore";
import { StudentProfile } from "@/types/user";

export function useStudentProfile() {
  const { session } = useAccountStore();

  return useQuery<StudentProfile, unknown>({
    queryKey: ["student-profile"],
    queryFn: async () => {
      const token = session?.sessionToken;

      if (!token) {
        throw new Error("Token de sesión no disponible");
      }

      const response = await get<StudentProfile>({
        path: "/people/profile/",
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });

      if (!response.data) {
        throw new Error("No se pudo obtener el perfil del estudiante");
      }

      return response.data;
    },
    enabled: !!session?.sessionToken,
  });
}
