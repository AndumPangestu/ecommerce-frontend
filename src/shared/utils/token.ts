const ACCESS_TOKEN_STORAGE_KEY = "auth_access_token";

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!hasWindow()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function setAccessToken(token: string): void {
  if (!hasWindow()) return;
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
}

export function removeAccessToken(): void {
  if (!hasWindow()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
