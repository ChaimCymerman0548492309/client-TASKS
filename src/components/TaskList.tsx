import { useAtom } from "jotai";
import { themeAtom } from "../contexts/theme";
import { List, Box, Button, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { TaskItem } from "./TaskItem";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
        onClick={toggleTheme}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>

      {tasks.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
          No tasks yet. Add your first task!
        </Typography>
      ) : (
        <List sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      )}
    </Box>
  );
};
