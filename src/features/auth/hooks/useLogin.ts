import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { ApiError } from "@/lib/httpClient";
import type { LoginRequest } from "@/features/auth/types/auth.type";
import type { LoginResult } from "@/features/auth/services/auth.service";
import * as authService from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/context/AuthContext";

type UseLoginOptions = UseMutationOptions<LoginResult, ApiError, LoginRequest>;

export function useLogin(options?: UseLoginOptions) {
  const { setAuthenticatedUser } = useAuth();

  return useMutation<LoginResult, ApiError, LoginRequest>({
    mutationKey: ["auth", "login"],
    mutationFn: async (payload) => authService.login(payload),
    onSuccess: (data, variables, context) => {
      setAuthenticatedUser(data.user);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
}


