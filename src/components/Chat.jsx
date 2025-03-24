import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { addConnections } from "../utils/ConnectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Send, ArrowLeft } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import NotPremium from "./NotPremium";

let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionUser, setConnectionUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isPremium, setIsPremium] = useState(null); // New state to track premium status

  const { connectionUserId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const connections = useSelector((state) => state.connection.connections);

  const userId = user?._id;
  const messagesEndRef = useRef(null);


  // To check MemberShip Type
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      setIsPremium(res.data.isPremium); // Store isPremium status
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching profile", error);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setConnectionUser(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connection:", error);
    }
  };

  const fetchChat = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${connectionUserId}`, {
        withCredentials: true,
      });

      const chat = res.data?.messages.map((msg) => {
        const isCurrentUser = msg?.senderId?._id === userId;
        return {
          text: msg?.text,
          name: isCurrentUser ? "You" : msg?.senderId?.name || "Unknown User",
          date: msg?.date,
          time: msg?.time,
          senderId: msg?.senderId?._id,
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

  useEffect(() => {
    if (!userId || !connectionUser) return;

    socket = createSocketConnection();
    socket.emit("userOnline", userId);
    socket.on("updateOnlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    socket.emit("joinChat", {
      name: user.name,
      userId,
      connectionUserId,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    socket.on("messageReceived", ({ name, text, time, date, senderId }) => {
      setMessages((messages) => [
        ...messages,
        { name, text, time, date, senderId },
      ]);
    });

    return () => {
      socket.emit("userOffline", userId);
      socket.disconnect();
    };
  }, [userId, connectionUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  // ❌ Show animated message if user is NOT premium or still loading
  if (isPremium === null || isPremium === false){
    return <NotPremium/>
  }
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <header className="bg-gray-800 p-4 flex items-center gap-3 shadow-lg sticky top-0 z-10">
        <button
          onClick={() => navigate("/connections")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h2 className="font-semibold text-lg flex-1 text-center">
          {connectionUser?.name || "User Name"}
          {onlineUsers?.includes(connectionUserId) ? (
            <span className="text-green-500 ml-2">● Online</span>
          ) : (
            <span className="text-red-500 ml-2">● Offline</span>
          )}
        </h2>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
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
      </main>

      <footer className="bg-gray-800 p-4 flex items-center gap-2 sticky bottom-0 shadow-md">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          <Send size={24} color="white" />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
