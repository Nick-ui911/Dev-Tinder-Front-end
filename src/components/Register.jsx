import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Strong password validation function
  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  // Age validation (must be a number and at least 18)
  const isValidAge = (age) => {
    return age >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Frontend validation
    if (!name || !email || !password || !age || !gender) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!isValidAge(age)) {
      setErrorMessage("You must be at least 18 years old.");
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
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>

      {errorMessage && ( // Show error message if exists
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <small className="text-gray-300">
            Must be at least 8 characters, include uppercase, lowercase, number & special character.
          </small>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-gray-600 p-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
