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
import { addUser } from "../utils/UserSlice";

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
  console.log(connectionUserId)
console.log(user)
  const userId = user?._id;
  console.log(userId)
  const messagesEndRef = useRef(null);

  // To check MemberShip Type
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      // console.log(res.data.isPremium)

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
  //  this is because in reload the user is disappear whom we are chatting with;

  // useEffect(() => {
  //   const foundConnection = connections.find(
  //     (connection) => connection._id === connectionUserId
  //   );
  //   if (foundConnection) {
  //     setConnectionUser(foundConnection);
  //     setLoading(false); // Data is now ready
  //   } else {
  //     fetchConnectionFromApi();
  //   }
  // }, [connections, connectionUserId]);

  // const fetchConnectionFromApi = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/user/connections`, {
  //       withCredentials: true,
  //     });

  //     const foundUser = res.data.data.find(
  //       (user) => user._id === connectionUserId
  //     );

  //     setConnectionUser(foundUser || null);
  //     dispatch(addConnections(res.data.data)); // Store all connections in Redux
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Failed to fetch connection:", error);
  //     setLoading(false);
  //   }
  // };

  const fetchChat = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${connectionUserId}`, {
        withCredentials: true,
      });
      console.log(res.data)
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
     // ✅ Fix: Ensure connectionUser is set correctly
     if (res.data?.participants) {
      const otherUser = res.data.participants.find((p) => p._id !== userId);
      if (otherUser) {
        setConnectionUser(otherUser);  // ✅ Set correct connection user
      }
      console.log(otherUser.name)
    }
  
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChat();
    }
  }, [userId]);

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
  if (isPremium === null || isPremium === false) {
    return <NotPremium />;
  }
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950  text-white overflow-hidden">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 flex items-center gap-3 shadow-lg sticky top-0 z-10">
        <button
          onClick={() => navigate("/connections")}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h2 className="font-semibold text-lg flex-1 text-center">
        {connectionUser ? connectionUser.name : "Loading..."} 
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
              className={`max-w-xs sm:max-w-md p-3 mb-10 rounded-lg ${
                msg.senderId === userId
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-black rounded-br-none"
                  : "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-bl-none"
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

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black border-t border-gray-700 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto px-3 py-2 flex items-center space-x-2">
          {/* Emoji Picker Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="group relative p-2 rounded-full hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
            >
              <span className="text-2xl sm:text-3xl transition-transform group-hover:rotate-12">
                😊
              </span>
              {/* Subtle pulse effect */}
              <span className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30 group-hover:opacity-50"></span>
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              className="absolute bottom-full mb-2 right-0 sm:right-10 w-full max-w-xs
    transform -translate-x-2 sm:translate-x-0
    scale-90 sm:scale-100 origin-bottom-right"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setShowEmojiPicker(false)} // Close emoji picker when input is focused
              type="text"
              className="w-full pl-4 pr-10 py-2 text-sm sm:text-base 
        bg-gray-700/50 backdrop-blur-sm 
        border border-gray-600/30 
        rounded-full 
        text-white 
        placeholder-gray-400 
        focus:outline-none 
        focus:ring-2 focus:ring-blue-500/50 
        transition-all duration-300 
        ease-in-out"
              placeholder="Type a message..."
            />
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="
        bg-gradient-to-r from-blue-600 to-purple-600 
        text-white 
        p-2 
        rounded-full 
        hover:from-blue-700 hover:to-purple-700 
        transition-all duration-300 
        ease-in-out 
        transform 
        hover:scale-110 
        active:scale-95
        disabled:opacity-30 
        disabled:cursor-not-allowed
        flex items-center justify-center
        shadow-lg
        hover:shadow-xl
      "
          >
            <Send size={20} sm:size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
