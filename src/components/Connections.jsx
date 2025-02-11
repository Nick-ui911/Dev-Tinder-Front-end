import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection.connections); // Access connections correctly from Redux
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
     
      dispatch(addConnections(response.data.data)); // Store connections in Redux
    } catch (error) {
      setError("Failed to load connections");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connections.length === 0) { // Fetch connections only if there are no connections in Redux
      fetchConnections();
    } else {
      setLoading(false); // Stop loading if connections are already available
    }
  }, [dispatch, connections]); // Trigger effect on dispatch or connections change

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
          {connections.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 shadow-md rounded-xl p-4 flex items-center space-x-4 hover:shadow-lg transition"
            >
              <img
                src={user.PhotoUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"}
                alt={user.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                <h3 className="text-lg font-semibold text-white">{user.gender}</h3>
                <p className="text-sm text-gray-500">Skill: {user.skill || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
