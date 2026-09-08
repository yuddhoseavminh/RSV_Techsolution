<<<<<<< HEAD
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
export const AUTH_TOKEN_KEY = "kt_solution_auth_token";

type ApiEnvelope<T> = {
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const body = init?.body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    const message = payload?.message ?? `API request failed: ${response.status}`;
    throw new ApiError(message, response.status, payload?.errors);
  }

  if (payload && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

export function apiMessage(error: unknown) {
  if (error instanceof ApiError) {
    const firstFieldError = error.errors ? Object.values(error.errors).flat()[0] : undefined;
    return firstFieldError ?? error.message;
  }

  return error instanceof Error ? error.message : "Something went wrong";
=======
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001/api/v1";

export class ApiError extends Error {
  status: number;
  data: any;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, data?: any, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("auth_token");
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  } catch (e) {
    console.error("Failed to persist token", e);
  }
}

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((init?.headers as Record<string, string>) ?? {})
  };

  const url = path.startsWith("http") ? path : `${API_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    let errorMessage = responseData?.message || `Request failed with status ${response.status}`;
    const errors = responseData?.errors;
    if (errors && typeof errors === "object") {
      const firstError = Object.values(errors)[0];
      if (Array.isArray(firstError) && firstError[0]) {
        errorMessage = firstError[0];
      }
    }
    throw new ApiError(errorMessage, response.status, responseData, errors);
  }

  return responseData as T;
>>>>>>> 9ade3f7e0d9de2e386bfb746881c089e804ee93c
}
