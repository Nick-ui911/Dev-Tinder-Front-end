import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/ConnectionSlice";
import { Link } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { AiOutlineUserDelete } from "react-icons/ai";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
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
      await axios.delete(`${BASE_URL}/user/unfollow/${userId}`, {
        withCredentials: true,
      });
      dispatch(
        addConnections(connections.filter((user) => user?._id !== userId))
      );
    } catch (error) {
      console.error("Error unfollowing user", error);
    }
  };

  useEffect(() => {
    if (connections.length === 0) {
      fetchConnections();
    } else {
      setLoading(false);
    }
  }, [dispatch, connections]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-12 text-white w-full overflow-hidden my-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Connections</h2>

      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading connections...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : connections.length === 0 ? (
        <p className="text-center text-gray-400">No connections found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full max-w-6xl mx-auto">
          {connections
            .filter((user) => user && user._id)
            .map((user, index) => (
              <div
                key={user?._id || index}
                className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center transition transform hover:scale-105 w-full"
              >
                {/* Profile Picture */}
                <img
                  src={
                    user?.PhotoUrl ||
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                  }
                  alt={user?.name || "User"}
                  className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
                />

                {/* User Info */}
                <h3 className="text-xl font-semibold mt-3">{user?.name || "Unknown User"}</h3>
                <p className="text-gray-400 text-sm">{user?.gender || "N/A"}</p>
                <p className="text-gray-300 text-sm">Skill: {user?.skill || "N/A"}</p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleUnfollow(user?._id)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    <AiOutlineUserDelete className="mr-2" /> Unfollow
                  </button>
                  <Link to={`/chat/${user?._id}`}>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200">
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
