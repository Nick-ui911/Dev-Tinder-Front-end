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
      const response = await axios.get(BASE_URL + "/user/connections", {
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
    <div className="container mx-auto my-16 p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        My Connections
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading connections...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : connections.length === 0 ? (
        <p className="text-center text-gray-600">No connections found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {connections
            .filter((user) => user && user._id)
            .map((user, index) => (
              <div
                key={user?._id || index}
                className="bg-gray-800 shadow-md rounded-xl p-4 flex items-center justify-between space-x-4 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      user?.PhotoUrl ||
                      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                    }
                    alt={user?.name || "User"}
                    className="w-16 h-16 rounded-full border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {user?.name || "Unknown User"}
                    </h3>
                    <h3 className="text-lg font-semibold text-white">
                      {user?.gender || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Skill: {user?.skill || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                  <button
                    onClick={() => handleUnfollow(user?._id)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition hover:scale-105"
                  >
                    <AiOutlineUserDelete className="mr-2" /> Unfollow
                  </button>
                  <Link to={`/chat/${user?._id}`}>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition hover:scale-105">
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
