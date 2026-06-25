const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const TOKEN_KEY = "kb_token";
const ORG_KEY = "kb_org";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getOrganization() {
  const raw = localStorage.getItem(ORG_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveAuth(token, organization) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ORG_KEY, JSON.stringify(organization));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ORG_KEY);
}

export function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchMe() {
  const response = await fetch(`${API_BASE}/me`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export { API_BASE };
