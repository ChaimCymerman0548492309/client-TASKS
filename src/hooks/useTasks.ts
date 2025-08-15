import { useAtom } from 'jotai';
import { tasksAtom } from '../contexts/tasks';
import { useEffect } from 'react';
import { fetchTasks } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    };
    getTasks();
  }, [setTasks]);

  return { tasks };
};
