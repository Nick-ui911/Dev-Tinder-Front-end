import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
  const [email, setEmail] = useState("saurav@gmail.com");
  const [password, setPassword] = useState("Saurav@102030");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const res = await axios.post(
        "http://localhost:9000/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center  bg-base-300">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
