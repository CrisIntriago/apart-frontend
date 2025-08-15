import { useQuery } from "@tanstack/react-query";
import { get } from "../abstractApiClient";
import { useAccountStore } from "@/data/store/accountStore";

export interface CourseStudent {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  photo: string;
  country: string;
  languages: {
    language: {
      id: number;
      name: string;
      icon: string;
    };
    level: string;
  }[];
  course: {
    id: number;
    name: string;
    description: string;
    image: string;
    difficulty: string;
    language: {
      id: number;
      name: string;
      icon: string;
    };
  };
}
export interface CourseProgress {
  course: {
    [key: string]: string;
  };
  overall: {
    total: number;
    completed: number;
    remaining: number;
    percent: number;
  };
  modules: {
    id: number;
    name: string;
    total: number;
    completed: number;
    remaining: number;
    percent: number;
  }[];
}

export function useCourseProgress(courseId: number) {
  const { session } = useAccountStore();

  return useQuery<CourseProgress, unknown>({
    queryKey: ["course-progress", courseId],
    queryFn: async () => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");

      const response = await get<CourseProgress>({
        path: `/content/courses/${courseId}/progress/`,
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });
      return (
        response.data ?? {
          course: {},
          overall: { total: 0, completed: 0, remaining: 0, percent: 0 },
          modules: [],
        }
      );
    },
    enabled: !!courseId,
  });
}

export function useCourseStudents(courseId: number) {
  return useQuery<CourseStudent[], unknown>({
    queryKey: ["course-students", courseId],
    queryFn: async () => {
      const response = await get<CourseStudent[]>({
        path: `/content/courses/${courseId}/students/`,
      });
      return response.data ?? [];
    },
    enabled: !!courseId,
  });
}
