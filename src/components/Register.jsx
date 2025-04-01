import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { requestNotificationPermission } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!name || !email || !password || !age || !gender) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { name, email, password, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      navigate("/profile");
      handleFcmToken(response.data.data._id);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleFcmToken = async (userId) => {
    if (!userId) return;
    await requestNotificationPermission(userId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-fade-in">
      <div
        className="bg-gray-400  bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 
                 shadow-xl rounded-2xl p-8  w-96 animate-slide-in"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center animate-pulse">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none"
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <select
            name="gender"
            className="w-full p-3 rounded-lg bg-white/30  text-black placeholder-white focus:outline-none"
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full h-6 w-6"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
