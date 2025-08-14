import api from "./config";
import Cookies from "js-cookie";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export const login = async (credentials: LoginCredentials): Promise<void> => {
  const { data } = await api.post("/auth/login", credentials);
  Cookies.set("token", data.token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 1, // יום
  });
};

export const register = async (userData: RegisterData): Promise<void> => {
  await api.post("/auth/register", userData);
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  Cookies.remove("token");
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    await api.get("/auth/verify");
    return true;
  } catch {
    return false;
  }
};
