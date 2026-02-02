import { httpClient } from "@/lib/httpClient";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/features/auth/types/auth.type";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return httpClient.post<LoginResponse>("/auth/login", payload, {
    withAuth: false,
  });
}

export async function register(
  payload: RegisterRequest
): Promise<RegisterResponse> {
  return httpClient.post<RegisterResponse>("/auth/register", payload, {
    withAuth: false,
  });
}
