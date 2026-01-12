import { useState, useEffect } from "react";
import { loginUser, registerUser } from "@/services/auth.api";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { token, userId } = await loginUser(username, password);
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return { token, userId, login, logout };
};
