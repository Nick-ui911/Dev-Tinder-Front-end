import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import bgimage from "../assets/bg.png";
import FeaturesSection from "./FeaturesSection";
import UsersCarousel from "./UsersCarousel";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  return (
    <>
      {/* Hero Section with Enhanced Design */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90 z-0"></div>

        {/* Blurred Background Image (Optional) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={bgimage}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Foreground Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white flex flex-col items-center px-4 sm:px-6 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unleash Your <span className="text-red-500">Development</span> Potential
          </h1>

          <p className="text-xl mb-8 max-w-xl mx-auto text-gray-300 opacity-90">
            Connect, collaborate, and create with developers from around the globe
          </p>

          {/* CTA Buttons with Enhanced Interactions */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="bg-red-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-700 transition-transform"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="border-2 border-white/80 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition-transform"
              >
                Login
              </motion.button>
            </div>
          )}

          {/* Social Proof */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>🚀 1000+ Developers</span>
            <span>•</span>
            <span>🌍 Global Community</span>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: [0, 15, 0], 
            opacity: [1, 0.5, 1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 flex flex-col items-center z-10"
        >
          <div className="animate-bounce w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white/50" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Developers Carousel */}
      <div className="py-10 bg-black">
        <UsersCarousel />
      </div>

      {/* Features Section */}
      <FeaturesSection />
    </>
  );
};

export default LandingPage;