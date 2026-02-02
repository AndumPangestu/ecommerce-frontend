import { isApiError } from "@/lib/httpClient";

type ErrorMessageOptions = {
  fallback: string;
  joinWith?: string;
};

type ValidationErrorShape = Record<string, string[]>;

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0);
}

function getErrorArrayFromPayload(payload: unknown): string[] | null {
  if (!payload || typeof payload !== "object") return null;
  const errorField = (payload as Record<string, unknown>).error;
  if (!Array.isArray(errorField)) return null;
  const messages = normalizeStringArray(errorField);
  return messages.length ? messages : null;
}

function isValidationErrorShape(value: unknown): value is ValidationErrorShape {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  for (const v of Object.values(value as Record<string, unknown>)) {
    if (!Array.isArray(v)) return false;
    if (v.some((item) => typeof item !== "string")) return false;
  }
  return true;
}

function getValidationErrorsFromPayload(payload: unknown): ValidationErrorShape | null {
  if (!payload || typeof payload !== "object") return null;
  const errorField = (payload as Record<string, unknown>).error;
  if (!isValidationErrorShape(errorField)) return null;
  return errorField;
}

export function getValidationErrorDetails(
  error: unknown,
  options?: { joinFieldWith?: string; joinFieldsWith?: string },
): string[] {
  const { joinFieldWith = ", ", joinFieldsWith = ": " } = options ?? {};
  if (!isApiError(error)) return [];
  const validationErrors = getValidationErrorsFromPayload(error.payload);
  if (!validationErrors) return [];

  const lines: string[] = [];
  for (const [field, messagesRaw] of Object.entries(validationErrors)) {
    const messages = normalizeStringArray(messagesRaw);
    if (messages.length === 0) continue;
    lines.push(`${field}${joinFieldsWith}${messages.join(joinFieldWith)}`);
  }
  return lines;
}

export function getErrorMessage(error: unknown, options: ErrorMessageOptions): string {
  const { fallback, joinWith = ", " } = options;

  if (isApiError(error)) {
    const validationDetails = getValidationErrorDetails(error);
    if (validationDetails.length > 0) return validationDetails.join(joinWith);

    const messages = getErrorArrayFromPayload(error.payload);
    if (messages) return messages.join(joinWith);
    return error.message || fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
}

