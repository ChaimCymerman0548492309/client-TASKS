import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Box, Button, Avatar, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import { logout, fetchTasks } from "../services/api";
import { connectWebSocket } from "../services/socket";
import { TaskList } from "../components/TaskList";
import { AddTask } from "../components/AddTask";
import { ExportButton } from "../components/ExportButton";
import { tasksAtom } from "../contexts/tasks";

export const Home = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
      import.meta.env.VITE_API_URL,
      (updatedTask) => {
        setTasks((prev) => {
          const exists = prev.some((t) => t._id === updatedTask._id);
          return exists
            ? prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
            : [...prev, updatedTask];
        });
      },
      (_id) => {
        setTasks((prev) => prev.filter((t) => t._id !== _id));
      }
    );

    return cleanup;
  }, [setTasks]);

  useEffect(() => {
    try {
      const storedUser = Cookies.get("userInfo");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user info:", error);
    }
  }, []);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <PersonIcon />
          </Avatar>
          <Chip
            label={username}
            color="primary"
            variant="outlined"
            sx={{
              fontSize: "1rem",
              px: 2,
              py: 1,
              borderRadius: 1,
              borderColor: "primary.main",
              backgroundColor: "background.paper",
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ ml: "auto" }}
        >
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
