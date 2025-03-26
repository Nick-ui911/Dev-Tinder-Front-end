import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const SuccessPage = ({ membershipType }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-lg"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold text-green-400"
        >
          🎉 Congratulations! 🎉
        </motion.h1>
        
        <p className="text-gray-300 mt-3 text-lg">
          You have successfully subscribed to the <strong className="text-yellow-400">{membershipType}</strong> plan.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all"
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
