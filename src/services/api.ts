import axios from "axios";
import type { Task } from "../types/task";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // שולח cookies לשרת
});

// אין צורך ב-interceptor ל-Authorization בכלל

// ============================
// Tasks
// ============================
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

// ============================
// Authentication
// ============================
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<void> => {
  const { data } = await api.post("/auth/login", credentials);
  console.log("🚀 Login response:", data);

  // שומרים רק userInfo לקריאה בצד הקליינט (לא את הטוקן!)
  if (data.userInfo) {
    Cookies.set("userInfo", JSON.stringify(data.userInfo), {
      secure: true,
      sameSite: "strict",
    });
  }
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
  Cookies.remove("userInfo");
};
