import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { logout, fetchTasks } from "../services/api";
import { connectWebSocket } from "../services/socket";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { ExportButton } from "../components/ExportButton";
import { tasksAtom } from "../contexts/tasks";

export const Home = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const loadInitialTasks = async () => {
      try {
        const initialTasks = await fetchTasks();
        setTasks(initialTasks);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setLoading(false);
      }
    };

    loadInitialTasks();

    const cleanup = connectWebSocket(
      API_URL,
      (updatedTask) => {
        setTasks((prev) => {
          const exists = prev.some((t) => t._id === updatedTask._id);
          if (exists) {
            return prev.map((t) =>
              t._id === updatedTask._id ? updatedTask : t
            );
          } else {
            return [...prev, updatedTask];
          }
        });
      },
      (_id) => {
        setTasks((prev) => prev.filter((t) => t._id !== _id));
      }
    );

    return cleanup;
  }, [setTasks]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <Box sx={{ p: 2 }}>Loading tasks...</Box>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <AddTask />
      <TaskList tasks={tasks} />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <ExportButton tasks={tasks} />
      </Box>
    </Box>
  );
};

export default Home;
