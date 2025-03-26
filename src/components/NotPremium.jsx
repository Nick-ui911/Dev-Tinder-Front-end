import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotPremium = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white text-center p-6"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="text-3xl sm:text-5xl font-bold"
      >
        ✨ Premium Access Required ✨
      </motion.h1>
      <p className="mt-4 text-base sm:text-lg opacity-90 max-w-sm">
        Upgrade to unlock exclusive chat features! 🚀
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
          className="w-full bg-gray-200 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition"
        >
          🏠 Go to Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/premium")}
          className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition"
        >
          🚀 Upgrade to Premium
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotPremium;
