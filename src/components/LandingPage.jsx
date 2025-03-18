import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bgimage from "../assets/bg.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Blurred Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Apply blur separately */}
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="relative z-10 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
          Start something <span className="text-red-500">epic.</span>
        </h1>

        {/* Show button only if user is NOT logged in */}
        {!user && (
          <button
            onClick={() => navigate("/register")}
            className="bg-red-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
