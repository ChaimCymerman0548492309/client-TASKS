import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { updateTask, deleteTask } from "../services/api/tasks";
import { useSnackbar } from "notistack";
import {
  ListItem,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { Delete, Edit, Check, Close } from "@mui/icons-material";
import type { Task } from "../types/task";
import { tasksAtom } from "../contexts/tasks";

export const TaskItem = ({ task }: { task: Task }) => {
  const [, setTasks] = useAtom(tasksAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const { enqueueSnackbar } = useSnackbar();
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = async (updates: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(task._id, updates);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
      enqueueSnackbar("Task updated", { variant: "success" });
      return true;
    } catch {
      enqueueSnackbar("Update failed", { variant: "error" });
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      enqueueSnackbar("Task deleted", { variant: "success" });
    } catch {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
  };

  const handleToggleComplete = async () => {
    await handleUpdate({ completed: !task.completed });
  };

  const handleEditSave = async () => {
    if (!editedTitle.trim()) {
      enqueueSnackbar("Title cannot be empty", { variant: "warning" });
      return;
    }
    const success = await handleUpdate({ title: editedTitle });
    if (success) setIsEditing(false);
  };

  return (
    <ListItem sx={{ borderBottom: "1px solid #eee", alignItems: "flex-start" }}>
      <Checkbox
        checked={task.completed}
        onChange={handleToggleComplete}
        color="primary"
      />
      <Box sx={{ flexGrow: 1 }}>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            variant="standard"
            inputRef={editInputRef}
            onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
          />
        ) : (
          <Typography
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "text.disabled" : "text.primary",
              fontSize: "1rem",
            }}
          >
            {task.title}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Created by {task.createdBy || "Unknown"} •{" "}
          {new Date(task.createdAt).toLocaleString("en-US")}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        {isEditing ? (
          <>
            <IconButton onClick={handleEditSave} color="primary">
              <Check />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)}>
              <Close />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          </>
        )}
      </Stack>
    </ListItem>
  );
};
