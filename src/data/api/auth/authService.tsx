import { useMutation } from "@tanstack/react-query";
import { post, ApartResponseApi } from "../abstractApiClient";

interface LoginPayload {
    username: string;
    password: string;
}

interface RegisterPayload {
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: any;
}

export function useAuthService() {
    const loginMutation = useMutation<ApartResponseApi<AuthResponse>, unknown, LoginPayload>({
        mutationFn: async (payload: LoginPayload) => {
            const response = await post<AuthResponse>({
                path: "/auth/login/",
                body: {
                    username: payload.username,
                    password: payload.password,
                },
            });
            return response
        }
    });
    const registerMutation = useMutation<ApartResponseApi<AuthResponse>, unknown, RegisterPayload>({
        mutationFn: (payload: RegisterPayload) =>
            post<AuthResponse>({
                path: "/auth/register",
                body: {
                    username: payload.username,
                    password: payload.password,
                },
            }),
    });

    return {
        login: loginMutation,
        register: registerMutation,
    };
}