import { useMutation } from "@tanstack/react-query";
import { post, ApartResponseApi } from "../abstractApiClient";
import { useAccountStore } from "@/data/store/accountStore";

interface LoginPayload {
  email?: string;
  password?: string;
  google_token?: string;
}

interface RegisterPayload {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  national_id?: string;
  country?: string;
  date_of_birth?: string;
  languages?: string[];
  google_token?: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

export function useAuthService() {
  const { session } = useAccountStore();

  const loginMutation = useMutation<
    ApartResponseApi<AuthResponse>,
    unknown,
    LoginPayload
  >({
    mutationFn: async (payload: LoginPayload = {}) => {
      const body: Record<string, any> = {};
      if (payload.email) body.email = payload.email;
      if (payload.password) body.password = payload.password;
      if (payload.google_token) body.google_token = payload.google_token;
      const response = await post<AuthResponse>({
        path: "/auth/login/",
        body,
      });
      return response;
    },
  });
  const registerMutation = useMutation<
    ApartResponseApi<AuthResponse>,
    unknown,
    RegisterPayload
  >({
    mutationFn: (payload: RegisterPayload) => {
      const body: Record<string, any> = {};
      if (payload.username) body.username = payload.username;
      if (payload.email) body.email = payload.email;
      if (payload.password) body.password = payload.password;
      if (payload.first_name) body.first_name = payload.first_name;
      if (payload.last_name) body.last_name = payload.last_name;
      if (payload.national_id) body.national_id = payload.national_id;
      if (payload.country) body.country = payload.country;
      if (payload.date_of_birth) body.date_of_birth = payload.date_of_birth;
      if (payload.languages) body.languages = payload.languages;
      if (payload.google_token) body.google_token = payload.google_token;
      return post<AuthResponse>({
        path: "/auth/register/",
        body,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = session?.sessionToken;
      if (!token) throw new Error("Token de sesión no disponible");
      return await post({
        path: "/auth/logout/",
        body: {},
        config: {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      });
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
}
