import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { ApiError } from "@/lib/httpClient";
import type { RegisterRequest } from "@/features/auth/types/auth.type";
import type { RegisterResult } from "@/features/auth/services/auth.service";
import * as authService from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/context/AuthContext";

type UseRegisterOptions = UseMutationOptions<
  RegisterResult,
  ApiError,
  RegisterRequest
>;

export function useRegister(options?: UseRegisterOptions) {
  const { setAuthenticatedUser } = useAuth();

  return useMutation<RegisterResult, ApiError, RegisterRequest>({
    mutationKey: ["auth", "register"],
    mutationFn: async (payload) => authService.register(payload),
    onSuccess: (data, variables, context) => {
      // Don't auto login after register
      // setAuthenticatedUser(data.user);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
}
