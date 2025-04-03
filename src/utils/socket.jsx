import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      transports: ["websocket", "polling"], // Allow both
      withCredentials: true,
    });
  } else {
    return io("/", {
      path: "/api/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  }
};
