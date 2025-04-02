import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  let socket;

  if (location.hostname === "localhost") {
    socket = io(BASE_URL, {
      reconnection: true, // Enable auto-reconnect
      reconnectionAttempts: Infinity, // Keep trying indefinitely
      reconnectionDelay: 1000, // Start with 1s delay
      reconnectionDelayMax: 5000, // Maximum delay of 5s
      transports: ["websocket"], // Use WebSocket only for better stability
    });
  } else {
    socket = io("/", {
      path: "/api/socket.io",
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket"],
    });
  }

  // ✅ Handle successful connection
  socket.on("connect", () => {
    console.log("✅ Socket connected!", socket.id);
  });

  // ⚠️ Handle disconnection & auto-reconnect
  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
    if (reason === "io server disconnect") {
      socket.connect(); // Manually reconnect if the server forcefully disconnected
    }
  });

  // ❌ Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("❌ Socket connection error:", error);
  });

  return socket;
};
