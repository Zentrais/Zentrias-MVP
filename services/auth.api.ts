import { api } from "./axios";

export const loginUser = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });
  const token  = res.data.token;

  let userId = "unknown";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.userId || payload.username || "unknown";
    console.log(" token connected",  token );
  } catch {
    console.warn("⚠️ Failed to parse token payload");
  }

  return { token, userId };
};

export const registerUser = async (username: string, password: string) => {
  const res = await api.post("/auth/register", { username, password });
  const { token } = res.data;

  let userId = "unknown";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.userId || payload.username || "unknown";
  } catch {
    console.warn("⚠️ Failed to parse token payload");
  }

  return { token, userId };
};