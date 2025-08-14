import type { Task } from "./task";

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    username: string;
  };
};

export type TaskUpdateMessage = {
  type: "task_updated";
  data: Task;
};
