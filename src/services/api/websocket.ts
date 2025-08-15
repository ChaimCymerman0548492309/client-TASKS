import type { Task } from "../../types/task";

const API_URL = import.meta.env.VITE_API_URL ;
const WS_URL =
  API_URL.replace(/^http/, "ws") + "/socket.io/?EIO=4&transport=websocket";

export const createWebSocket = (callbacks: {
  onTaskUpdate: (task: Task) => void;
  onError?: () => void;
}) => {
  const socket = new WebSocket(`${WS_URL}/ws`);

  socket.onopen = () => console.log("WebSocket Connected");

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case "task_updated":
        callbacks.onTaskUpdate(message.data);
        break;
    }
  };

  socket.onerror = () => callbacks.onError?.();

  return {
    close: () => socket.close(),
  };
};
