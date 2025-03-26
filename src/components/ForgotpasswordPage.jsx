import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { EyeIcon, EyeOffIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await axios.patch(
        BASE_URL + "/profile/password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      setSuccess(true);
      setMessage(response.data.message);
      setOldPassword("");
      setNewPassword("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
    <div className="max-w-md w-full mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 rounded-lg shadow-2xl relative">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Change Password
      </h2>
  
      {/* Success Message with Animation */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`mb-4 p-3 text-center rounded-lg shadow-md flex items-center justify-center gap-2 ${
              success
                ? "bg-green-500/20 text-green-400 border border-green-600"
                : "bg-red-500/20 text-red-400 border border-red-600"
            }`}
          >
            {success ? <CheckCircleIcon size={20} /> : null}
            {message}
          </motion.div>
        )}
      </AnimatePresence>
  
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-300">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full text-white p-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>
  
        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full text-white p-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>
  
        {/* Submit Button with Loader */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-semibold p-3 rounded-lg hover:opacity-90 transition duration-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" size={20} /> : null}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  </div>
  
  
  );
};

export default ForgotPasswordPage;
