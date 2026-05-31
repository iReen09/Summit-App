export type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type ApiSuccessPayload<T> = {
  data: T;
};

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => null)) as (Partial<ApiSuccessPayload<T>> & ApiErrorPayload) | null;

  if (!response.ok) {
    throw new Error(payload?.error?.message ?? "Request gagal diproses.");
  }

  return payload?.data as T;
}
