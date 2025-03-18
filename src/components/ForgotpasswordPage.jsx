import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ForgotPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 mb-46 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Change Password
      </h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-black">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full  text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-black"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-black">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full  text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-black"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-black p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
