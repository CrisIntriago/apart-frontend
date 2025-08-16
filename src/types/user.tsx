export interface StudentProfile {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  photo: string | null;
  country: string;
  email: string;
  has_access: boolean;
  languages: {
    language: {
      id: number;
      name: string;
      icon: string | null;
    };
    level: string;
  }[];
  course: {
    id: number;
    name: string;
    description: string;
    image: string;
    difficulty: string;
  };
}
