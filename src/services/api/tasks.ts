import api from "./config";
import type { CreateTaskData, Task } from "../../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  // Default values
  const payload = {
    completed: false,
    ...taskData,
  };

  const { data } = await api.post<Task>("/tasks", payload);
  return data;
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
