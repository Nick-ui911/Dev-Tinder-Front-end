import React from "react";
import { MdWifiOff } from "react-icons/md"; // Correct WiFi off icon
import { IoReload } from "react-icons/io5"; // Reload icon
import useOnline from "../utils/useOnline";

const OfflineScreen = () => {
  const isOnline = useOnline();

  if (isOnline) return null; // Hide component if online

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white z-50 text-center p-6 animate-fadeIn">
      {/* WiFi Off Icon */}
      <MdWifiOff className="text-red-500 text-9xl mb-4 animate-pulse" />

      {/* Title */}
      <h1 className="text-4xl font-extrabold">You're Offline</h1>

      {/* Message */}
      <p className="mt-3 text-lg text-gray-300 max-w-lg">
        It seems you've lost your internet connection. Please check your network or try reconnecting.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <IoReload className="text-xl" /> Retry Connection
      </button>
    </div>
  );
};

export default OfflineScreen;
