import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { addConnections } from "../utils/ConnectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

let socket; // ✅ Global socket instance

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionUser, setConnectionUser] = useState(null);
  const { connectionUserId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const connections = useSelector((state) => state.connection.connections);

  const userId = user?._id;

  const messagesEndRef = useRef(null); // ✅ Ref for auto-scroll

  // ✅ Fetch connection from API
  useEffect(() => {
    const foundConnection = connections.find(
      (connection) => connection._id === connectionUserId
    );
    if (foundConnection) {
      setConnectionUser(foundConnection);
    } else {
      fetchConnectionFromApi();
    }
  }, [connections, connectionUserId]);

  const fetchConnectionFromApi = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnectionUser(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connection:", error);
    }
  };

  // ✅ Fetch Chat Messages from Backend
  const fetchChat = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + connectionUserId, {
        withCredentials: true,
      });

      const chat = res.data?.messages.map((msg) => {
        const isCurrentUser = msg?.senderId?._id === userId;
        return {
          text: msg?.text,
          name: isCurrentUser ? "You" : msg?.senderId?.name || "Unknown User",
          date: msg?.date,
          time: msg?.time,
          senderId: msg?.senderId?._id, // ✅ Add this line
        };
      });

      setMessages(chat || []);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  // ✅ Handle Socket Connection and Listen for Messages
  useEffect(() => {
    if (!userId || !connectionUser) return;

    socket = createSocketConnection(); // Create socket connection
    socket.emit("joinChat", {
      name: user.name,
      userId,
      connectionUserId,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    // ✅ Listening to Incoming Messages
    socket.on("messageReceived", ({ name, text, time, date, senderId }) => {
      setMessages((messages) => [
        ...messages,
        { name, text, time, date, senderId }, // ✅ Add senderId here too
      ]);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, [userId, connectionUser]);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send Message Function
  const sendMessage = () => {
    if (!newMessage) return;

    socket.emit("sendMessage", {
      name: user.name,
      userId,
      connectionUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    setNewMessage("");
  };

  // ✅ Send Message on "Enter" Key Press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 text-white p-4 flex items-center gap-3 sticky top-0 z-10 shadow-md">
        <button
          onClick={() => navigate("/connections")}
          className="text-xl mr-3"
        >
          🔙
        </button>
        <div>
          <h2 className="font-semibold text-lg">
            {connectionUser?.name || "User Name"}
          </h2>
          <p className="text-sm opacity-75">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                msg.senderId === userId
                  ? "bg-blue-500 text-black rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }`}
            >
              <div className="text-xs opacity-50 mb-1">
                {msg.senderId === userId ? "You" : msg.name}
              </div>
              <div>{msg.text}</div>
              <div className="text-xs opacity-50 mt-1 text-right">
                {msg.time} | {msg.date}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-800 p-4 sticky bottom-0 flex items-center gap-2 shadow-md">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
