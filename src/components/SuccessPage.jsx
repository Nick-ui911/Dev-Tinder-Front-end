import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <Confetti />
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-400">Payment Successful! 🎉</h1>
        <p className="text-gray-300 mt-4">Thank you for your purchase. Your premium membership is now active!</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
