import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2 for spinner
import { motion, AnimatePresence } from "framer-motion"; // Added framer-motion for animations
import { Link } from "react-router-dom";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!password || !confirmPassword) {
        throw new Error("Please fill in both fields.");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      const res = await axios.patch(
        BASE_URL + "/createPassword",
        { password },
        { withCredentials: true }
      );

      setSuccess(res?.data?.message || "Password created successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong!";
      setError(errorMsg);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Create Password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* Success Message with Animation */}
          <AnimatePresence>
            {success && (
              <motion.p
                className="text-green-400 text-center text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className="bg-blue-500 flex items-center justify-center gap-2 text-white py-3 rounded-lg hover:bg-blue-600 transition-all disabled:bg-blue-300"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? "Creating..." : "Create Password"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link
              to="/ForgotPasswordPage"
              className="text-blue-600 hover:underline"
            >
              Update Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
