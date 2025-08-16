/* eslint-disable @typescript-eslint/no-explicit-any */
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ userInfo: any }> => {
  try {
    const response = await api.post("/auth/login", credentials);

    if (response.data.userInfo) {
      Cookies.set("userInfo", JSON.stringify(response.data.userInfo.username), {
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error; // Propagate server error as-is
    }
    throw new Error("Network error. Please check your connection");
  }
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<void> => {
  try {
    const response = await api.post("/auth/register", userData);
    if (response.status !== 201) {
      throw new Error(response.data?.error || "Registration failed");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.error || error.response.data?.message
      );
    }
    throw new Error("Network error. Please try again");
  }
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  Cookies.remove("userInfo");
};
