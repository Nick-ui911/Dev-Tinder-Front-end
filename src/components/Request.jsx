import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { addConnections } from "../utils/ConnectionSlice"; 
import Loader from "./Loader";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request.requests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
      setError("");
    } catch (error) {
      setError("Failed to load requests");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));

      if (status === "accepted") {
        const response = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(response.data.data));
      }

      setSuccessMessage(`Request ${status === "accepted" ? "accepted" : "rejected"} successfully`);
      setError("");
    } catch (error) {
      setError("Failed to review request");
    }
  };

  useEffect(() => {
    if (requests.length === 0) {
      fetchRequest();
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); 
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white my-10">
      {/* Content Wrapper */}
      <div className="flex-grow container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center mb-10">My Requests</h2>

        {successMessage && (
          <p className="text-center text-green-400 text-lg font-semibold bg-green-900 bg-opacity-20 p-3 rounded-lg shadow-md">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 text-lg font-semibold bg-red-900 bg-opacity-20 p-3 rounded-lg shadow-md">
            {error}
          </p>
        )}

        {loading ? (
          <Loader/>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No requests found.</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 max-w-6xl mx-auto">
            {requests.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center transition transform hover:scale-105"
              >
                {/* Profile Picture */}
                <img
                  src={
                    user.fromUserId?.PhotoUrl ||
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                  }
                  alt={user.fromUserId?.name || "Unknown User"}
                  className="w-20 h-20 rounded-full border-4 border-gray-600 shadow-md"
                />

                {/* User Info */}
                <h3 className="text-lg font-bold mt-3">{user.fromUserId?.name || "Unknown"}</h3>
                <p className="text-sm text-gray-400">{user.fromUserId?.gender || "Unknown"}</p>
                <p className="text-sm text-gray-500">
                  Skills: {user.fromUserId?.skills?.join(", ") || "N/A"}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => reviewRequest("accepted", user._id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    
    </div>
  );
};

export default Request;
