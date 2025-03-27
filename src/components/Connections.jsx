import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/ConnectionSlice";
import { Link } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { AiOutlineUserDelete } from "react-icons/ai";
import Loader from "./Loader";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  // Filter feeds based on search query
  const filteredConnections = connections.filter((connection) =>
    connection?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      setError("Failed to load connections");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/user/unfollow/${userId}`, {
        withCredentials: true,
      });
      dispatch(
        addConnections(connections.filter((user) => user?._id !== userId))
      );
    } catch (error) {
      console.error("Error unfollowing user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 text-white w-full overflow-hidden mt-16">
      {/* 🔍 Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg px-5 py-3 text-white bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8">My Connections</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredConnections.length === 0 ? (
        <p className="text-center text-gray-400">No connections found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full max-w-6xl mx-auto">
          {filteredConnections
            .filter((user) => user && user._id)
            .map((user, index) => (
              <div
                key={user?._id || index}
                className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 
                         backdrop-blur-lg shadow-xl rounded-xl p-6 flex flex-col items-center 
                         "
              >
                {/* Background Glow Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 
                              opacity-50 blur-2xl rounded-xl pointer-events-none"
                ></div>

                {/* Profile Picture */}
                <img
                  src={
                    user?.PhotoUrl ||
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                  }
                  alt={user?.name || "User"}
                  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg hover:shadow-xl transition"
                />

                {/* User Info */}
                <h3 className="text-xl font-semibold mt-3 text-white">
                  {user?.name || "Unknown User"}
                </h3>
                <p className="text-gray-300 text-sm">{user?.gender || "N/A"}</p>
                <p className="text-gray-400 text-sm">
                  Skill: {user?.skill || "N/A"}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleUnfollow(user?._id)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                             rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <AiOutlineUserDelete className="mr-2" /> Unfollow
                  </button>
                  <Link to={`/chat/${user?._id}`}>
                    <button
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                                     rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      <FiMessageSquare className="mr-2" /> Chat
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
