import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true); // Show loader
    setError(""); // Reset error before request

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feeddata");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
     

      {!loading && (
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 
                         backdrop-blur-lg  p-8 rounded-xl shadow-2xl w-full sm:w-96">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6">
            Login
          </h2>
          {error && <span className="text-red-500 text-sm">{error}</span>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div className="mb-6 relative">
              <label className="block text-white text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-12"
                required
              />
              <span
                className="absolute top-10 right-4 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>

            <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full h-6 w-6"></span>
            ) : (
              "Login"
            )}
          </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
