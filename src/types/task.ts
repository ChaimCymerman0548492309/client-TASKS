export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Username
  userId: string; // User ID
}

// Type for creating new tasks (without server-generated fields)
export type CreateTaskData = {
  title: string;
  description?: string;
  completed?: boolean; // Optional with default false
};
