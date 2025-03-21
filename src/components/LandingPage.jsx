import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import bgimage from "../assets/bg.png";
import FeaturesSection from "./FeaturesSection";
import DevelopersCarousel from "./DevelopersCarousel";


const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        {/* Blurred Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={bgimage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-md sm:backdrop-blur-lg"></div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-50"></div>

        {/* Foreground Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white flex flex-col items-center px-4 sm:px-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Start something <span className="text-red-500">epic.</span>
          </h1>

          <p className="text-lg sm:text-xl mb-4 opacity-80">
            Join now and connect with thousands of developers worldwide!
          </p>

          {/* Developers Carousel */}
     

          {/* CTA Buttons */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate("/register")}
                className="bg-red-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-100"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-black transition-transform transform hover:scale-105 active:scale-100"
              >
                Login
              </button>
            </div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <span className="text-sm opacity-70">Scroll down</span>
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            ↓
          </div>
        </motion.div>
      </div>


           {/* 👇 Move DevelopersCarousel here to avoid alignment issues */}
           <div className="py-10 bg-gray-900">
        <DevelopersCarousel />
      </div>

      {/* Features Section - Now Below the Hero Section */}
      <FeaturesSection />
    </>
  );
};

export default LandingPage;
