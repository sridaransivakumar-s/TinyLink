const API_BASE = import.meta.env.VITE_BACKEND_URL;
export const getLinks = async () => {
  const res = await fetch(`${API_BASE}/api/links`);
  return res.json();
};

export const createLink = async (payload) => {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
};

export const deleteLink = async (code) => {
  return fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
};

export const getStats = async (code) => {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  return res.json();
};

export const getHealth = async () => {
  const res = await fetch(`${API_BASE}/healthz`);
  return res.json();
};
