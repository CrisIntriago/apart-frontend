import { useQuery } from "@tanstack/react-query";
import { get } from "../abstractApiClient";

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
