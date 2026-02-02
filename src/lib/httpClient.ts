import { getAccessToken } from "@/shared/utils/token";

export type ApiErrorPayload = unknown;

export class ApiError<TPayload = ApiErrorPayload> extends Error {
  status: number;
  payload?: TPayload;

  constructor(message: string, status: number, payload?: TPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function getMessageFromPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  if (!("message" in payload)) return null;
  const message = (payload as Record<string, unknown>).message;
  return typeof message === "string" ? message : null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type HttpRequestOptions = {
  method: HttpMethod;
  path: string;
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
  withAuth?: boolean;
};

import { getEnv } from "@/config/env";

function getBaseUrl(): string {
  const baseUrl = getEnv("VITE_API_BASE_URL");
  if (!baseUrl) {
    throw new Error("VITE_API_BASE_URL is not set");
  }
  return baseUrl.replace(/\/+$/, "");
}

function buildUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

async function parseResponsePayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  return text.length ? text : null;
}

async function request<TResponse>(
  options: HttpRequestOptions,
): Promise<TResponse> {
  const { method, path, body, headers, signal, withAuth = true } = options;

  const finalHeaders: HeadersInit = {
    Accept: "application/json",
    ...headers,
  };

  let bodyPayload: BodyInit | undefined;
  if (body !== undefined) {
    bodyPayload = JSON.stringify(body);
    if (
      typeof (finalHeaders as Record<string, string>)["Content-Type"] ===
      "undefined"
    ) {
      (finalHeaders as Record<string, string>)["Content-Type"] =
        "application/json";
    }
  }

  if (withAuth) {
    const token = getAccessToken();
    if (token) {
      (finalHeaders as Record<string, string>).Authorization =
        `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path), {
      method,
      headers: finalHeaders,
      body: bodyPayload,
      signal,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    throw new ApiError(message, 0);
  }

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    const message =
      getMessageFromPayload(payload) || response.statusText || "Request failed";
    throw new ApiError(message, response.status, payload);
  }

  return payload as TResponse;
}

export const httpClient = {
  get: async <TResponse>(
    path: string,
    options?: Omit<HttpRequestOptions, "method" | "path">,
  ) => request<TResponse>({ method: "GET", path, ...options }),
  post: async <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<HttpRequestOptions, "method" | "path" | "body">,
  ) => request<TResponse>({ method: "POST", path, body, ...options }),
  put: async <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<HttpRequestOptions, "method" | "path" | "body">,
  ) => request<TResponse>({ method: "PUT", path, body, ...options }),
  patch: async <TResponse>(
    path: string,
    body?: unknown,
    options?: Omit<HttpRequestOptions, "method" | "path" | "body">,
  ) => request<TResponse>({ method: "PATCH", path, body, ...options }),
  delete: async <TResponse>(
    path: string,
    options?: Omit<HttpRequestOptions, "method" | "path">,
  ) => request<TResponse>({ method: "DELETE", path, ...options }),
};
