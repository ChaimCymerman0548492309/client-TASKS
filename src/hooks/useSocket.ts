import { useEffect } from "react";
import type { Task } from "../types/task";

export const useSocket = (onUpdate: (task: Task) => void) => {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const WS_URL =
  API_URL.replace(/^http/, "ws") + "/socket.io/?EIO=4&transport=websocket";
    const socket = new WebSocket(`${WS_URL}/ws`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "task_update") {
        onUpdate(data.task);
      }
    };

    return () => {
      socket.close();
    };
  }, [onUpdate]);
};
