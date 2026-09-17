const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api/v1";
export async function api(path, options = {}) {
  const token = localStorage.getItem("ecom-token");
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || "Unable to complete that request.");
    error.status = response.status;
    throw error;
  }
  return body;
}
