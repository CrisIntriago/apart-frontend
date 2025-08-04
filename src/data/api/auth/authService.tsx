import { useMutation } from "@tanstack/react-query";
import { post, ApartResponseApi } from "../abstractApiClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  national_id: string;
  country: string;
  date_of_birth: string;
  languages: string[];
}

interface AuthResponse {
  token: string;
  user: any;
}

export function useAuthService() {
  const loginMutation = useMutation<
    ApartResponseApi<AuthResponse>,
    unknown,
    LoginPayload
  >({
    mutationFn: async (payload: LoginPayload) => {
      const response = await post<AuthResponse>({
        path: "/auth/login/",
        body: {
          email: payload.email,
          password: payload.password,
        },
      });
      return response;
    },
  });
  const registerMutation = useMutation<
    ApartResponseApi<AuthResponse>,
    unknown,
    RegisterPayload
  >({
    mutationFn: (payload: RegisterPayload) =>
      post<AuthResponse>({
        path: "/auth/register/",
        body: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          first_name: payload.first_name,
          last_name: payload.last_name,
          national_id: payload.national_id,
          country: payload.country,
          date_of_birth: payload.date_of_birth,
          languages: payload.languages,
        },
      }),
  });

  return {
    login: loginMutation,
    register: registerMutation,
  };
}
