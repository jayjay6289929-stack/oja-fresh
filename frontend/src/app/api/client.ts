const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/** Returns the stored JWT token, if any. */
function getToken(): string | null {
  return localStorage.getItem("oja_fresh_token");
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`${res.status}: ${message}`);
  }

  return res.json() as Promise<T>;
}