import axios from "axios";
import type { Task } from "../types/task";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL ;

// יצירת מופע axios מותאם אישית
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// אינטרספטור להוספת הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// אינטרספטור לטיפול בשגיאות
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ניתוב מחדש לדף התחברות אם הטוקן לא תקין
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);



export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (
  taskData: Omit<Task, "_id">
): Promise<Task> => {
  const { data } = await api.post("/tasks", taskData);
  return data;
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// פונקציות אימות
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<void> => {
  const { data } = await api.post("/auth/login", credentials);
  console.log("🚀 ~ login ~ data:", data)
  Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<void> => {
  await api.post("/auth/register", userData);
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  Cookies.remove("token");
};
