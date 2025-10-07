import { io } from "socket.io-client";
import { BASE_URL } from "./constants";
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
      // 🖥️ If running locally, connect using BASE_URL (e.g., http://localhost:5000)
    return io(BASE_URL);
  } else {
     // 🌍 In production, connect relative to the current domain using a custom path
    return io("/", { path: "/api/socket.io" });
  }
};
