import { ApiError } from "@/lib/httpClient";
import * as authApi from "@/features/auth/api/auth.api";
import { setAccessToken } from "@/shared/utils/token";
import type { LoginRequest, RegisterRequest } from "@/features/auth/types/auth.type";
import type { User } from "@/features/auth/context/AuthContext";

export type LoginResult = {
  user: User;
  token: string;
};

export type RegisterResult = {
  user: User;
  token: string;
};

export async function login(payload: LoginRequest): Promise<LoginResult> {
  const response = await authApi.login(payload);

  if (!response.success) {
    throw new ApiError(
      response.message || "Login failed",
      response.status,
      response
    );
  }

  const { data } = response;

  setAccessToken(data.token);

  const user: User = {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    phone: data.phone,
    address: data.address,
    image: data.image,
  };

  return { user, token: data.token };
}

export async function register(
  payload: RegisterRequest
): Promise<RegisterResult> {
  const response = await authApi.register(payload);

  if (!response.success) {
    throw new ApiError(
      response.message || "Registration failed",
      response.status,
      response
    );
  }

  const { data } = response;

  setAccessToken(data.token);

  const user: User = {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    phone: data.phone ?? undefined,
    address: data.address,
    image: data.image,
  };

  return { user, token: data.token };
}

