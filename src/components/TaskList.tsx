import { useAtom } from "jotai";
import { themeAtom,  } from "../contexts/tasks";
import { List, Box, Button } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { TaskItem } from "./TaskItem";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
}
export const TaskList = ({ tasks }: TaskListProps) => {
  const [theme, setTheme] = useAtom(themeAtom);
  // const [tasks] = useAtom(tasksAtom);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Box>
      {/* Toggle theme button */}
      <Button
        startIcon={theme === "dark" ? <LightMode /> : <DarkMode />}
        onClick={toggleTheme}
        sx={{ mb: 2 }}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>

      {/* Tasks list */}
      <List>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </List>
    </Box>
  );
};
