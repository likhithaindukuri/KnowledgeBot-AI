import { API_BASE, authHeaders } from "./auth";

export async function fetchAnalytics() {
  const response = await fetch(`${API_BASE}/analytics`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to load analytics");
  return response.json();
}

export async function fetchDocuments() {
  const response = await fetch(`${API_BASE}/documents`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to load documents");
  return response.json();
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("kb_token");
  const response = await fetch(`${API_BASE}/documents/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Upload failed");
  return data;
}

export async function deleteDocument(documentId) {
  const response = await fetch(`${API_BASE}/documents/${documentId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete document");
  return response.json();
}

export async function fetchWidgetSettings() {
  const response = await fetch(`${API_BASE}/widget/settings`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to load widget settings");
  return response.json();
}

export async function updateWidgetSettings(settings) {
  const response = await fetch(`${API_BASE}/widget/settings`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error("Failed to save widget settings");
  return response.json();
}

export async function uploadWidgetLogo(file) {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("kb_token");
  const response = await fetch(`${API_BASE}/widget/logo`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Logo upload failed");
  return data;
}

export async function fetchEmbedSnippet() {
  const response = await fetch(`${API_BASE}/embed/snippet`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to load embed snippet");
  return response.json();
}

export async function deleteWidgetLogo() {
  const response = await fetch(`${API_BASE}/widget/logo`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to remove logo");
  return response.json();
}

export async function askPlatformAssistant(question) {
  const response = await fetch(`${API_BASE}/platform/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Assistant unavailable");
  return data;
}
