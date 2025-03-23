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
    <div className="max-w-md mx-auto mt-30 mb-46 p-6 border rounded-lg shadow-lg bg-white relative">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Change Password
      </h2>

      {/* Success Message with Animation */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`mb-4 p-3 text-center rounded-lg ${
              success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            } flex items-center justify-center gap-2`}
          >
            {success ? <CheckCircleIcon size={20} /> : null}
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-black">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-black"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
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
              className="w-full text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-black"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button with Loader */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 flex justify-center items-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2Icon className="animate-spin" size={20} /> : null}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
