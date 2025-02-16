import React from "react";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/bg2.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Start something epic.
        </h1>
        <button
          onClick={() => navigate("/register")}
          className="bg-gray-800 text-red-600 text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-900 transition"
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
