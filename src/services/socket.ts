/* eslint-disable @typescript-eslint/no-explicit-any */
import io from "socket.io-client";
import type { Task } from "../types/task";

let socket: any | null = null;

export const connectWebSocket = (
  url: string,
  onUpdate: (task: Task) => void,
  onDelete: (_id: string) => void
) => {
  if (socket) socket.disconnect();

  const normalizedUrl = url.replace(/\/api\/?$/, "");
  socket = io(normalizedUrl, {
    path: "/api/socket.io",
    transports: ["websocket"],
    autoConnect: true,
    // withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => console.log("Socket.IO connected"));
  socket.on("disconnect", () => console.log("Socket.IO disconnected"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket.on("connect_error", (err : any) => console.error("Socket.IO error:", err));

  socket.on("task_created", (task: Task) => onUpdate(task));
  socket.on("task_updated", (task: Task) => onUpdate(task));
  socket.on("task_deleted", ({ _id }: { _id: string }) => onDelete(_id));

  return () => {
    socket?.disconnect();
    socket = null;
  };
};

export const sendWebSocketMessage = (message: unknown) => {
  if (socket && socket.connected) {
    socket.emit("task_update", message);
  } else {
    console.warn("Socket.IO not connected");
  }
};
