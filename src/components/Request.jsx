import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/RequestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const Request = useSelector((state) => state.request.requests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequest(response.data.data));
    } catch (error) {
      setError("Failed to load requests");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Request || Request.length === 0) {
      fetchRequest();
    } else {
      setLoading(false);
    }
  }, [Request, dispatch]);

  return (
    <div className="container mx-auto my-16 px-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        My Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading requests...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : Request.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No requests found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {Request.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-2xl transition duration-300"
            >
              <img
                src={
                  user.fromUserId?.PhotoUrl ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                }
                alt={user.fromUserId?.name || "Unknown User"}
                className="w-16 h-16 rounded-full border-2 border-gray-600"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">
                  {user.fromUserId?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-400">
                  {user.fromUserId?.gender || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  Skill: {user.fromUserId?.skills?.join(", ") || "N/A"}
                </p>
                <div className="mt-3 flex space-x-3">
                  <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition">
                    Accept
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
