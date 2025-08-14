import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { createTask } from "../services/api/tasks";

export const AddTask = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      enqueueSnackbar("Task title cannot be empty", { variant: "warning" });
      return;
    }

    try {
      setLoading(true);

      // שולח רק לשרת - לא מוסיף ל-local state
      await createTask({
        title,
        completed: false,
      });

      setTitle("");
      enqueueSnackbar("Task added successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to add task. Please try again.", {
        variant: "error",
      });
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
        mb: 3,
      }}
    >
      <TextField
        label="Add new task"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        inputProps={{
          maxLength: 100,
          "aria-label": "Enter task title",
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !title.trim()}
        sx={{
          minWidth: 120,
          height: 56,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Add Task"}
      </Button>
    </Box>
  );
};
