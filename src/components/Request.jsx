import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { addConnections } from "../utils/ConnectionSlice"; // Import for updating connections

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request.requests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success messages

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
      setError(""); // Clear any previous error
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

      // If accepted, fetch updated connections
      if (status === "accepted") {
        const response = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(response.data.data));
      }

      // Show success message
      setSuccessMessage(`Request ${status === "accepted" ? "accepted" : "rejected"} successfully`);
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Failed to review request");
    }
  };

  useEffect(() => {
    if (requests.length === 0) {
      fetchRequest();
    }
  }, []);

  return (
    <div className="container mx-auto my-16 px-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        My Requests
      </h2>

      {/* Success Message */}
      {successMessage && (
        <p className="text-center text-green-500 text-lg">{successMessage}</p>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No requests found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {requests.map((user) => (
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
                  <button
                    onClick={() => reviewRequest("accepted", user._id)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => reviewRequest("rejected", user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
                  >
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
