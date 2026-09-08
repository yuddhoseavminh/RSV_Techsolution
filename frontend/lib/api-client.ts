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

export function clearStoredToken(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("auth_token");
    } catch (e) {
      console.error("Failed to clear token", e);
    }
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

  if (responseData && typeof responseData === "object" && "data" in responseData && responseData.data !== undefined) {
    return responseData.data as T;
  }

  return responseData as T;
}

export function apiMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.errors) {
      const firstFieldError = Object.values(error.errors).flat()[0];
      if (firstFieldError) return firstFieldError;
    }
    return error.message;
  }

  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
