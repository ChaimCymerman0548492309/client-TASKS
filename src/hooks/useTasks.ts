import { useAtom } from 'jotai';
import { tasksAtom } from '../contexts/tasks';
import { useEffect } from 'react';
import { getTasks } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, [setTasks]);

  return { tasks };
};
