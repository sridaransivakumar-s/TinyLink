           
const API_BASE = "http://localhost:3000/api";

export const getLinks = async () => {
  const res = await fetch(`${API_BASE}/links`);
  return res.json();
};

export const createLink = async (payload) => {
  const res = await fetch(`${API_BASE}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
};

export const deleteLink = async (code) => {
  return fetch(`${API_BASE}/links/${code}`, { method: "DELETE" });
};

export const getStats = async (code) => {
  const res = await fetch(`${API_BASE}/links/${code}`);
  return res.json();
};

export const getHealth = async () => {
  const res = await fetch("http://localhost:3000/healthz");
  return res.json();
};
