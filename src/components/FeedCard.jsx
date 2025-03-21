import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import { FaUser, FaCode, FaMale, FaFemale, FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import maleProfile from "../assets/maleDefaultProfile.png";
import femaleProfile from "../assets/femaleDefaultProfile.png";

const FeedCard = ({ _id, name, gender, age, PhotoUrl, skills }) => {
  const [error, setError] = useState("");

  const handleRequestSend = async (status) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      setError("");
    } catch (error) {
      setError("Failed to review request");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300"
    >
      <img
        src={PhotoUrl || gender === "Male" ? maleProfile : femaleProfile}
      
        alt={name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaUser /> {name}, {age}
        </h3>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          {gender === "Male" ? <FaMale /> : <FaFemale />} {gender}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
              <FaCode /> {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between py-4 border-t px-5">
        <button
          onClick={() => handleRequestSend("ignored")}
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-200 flex items-center gap-2"
        >
          <FaUserAltSlash /> Ignore
        </button>
        <button
          onClick={() => handleRequestSend("interested")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
        >
          <FaUserCheck /> Connect
        </button>
      </div>
      {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
    </motion.div>
  );
};

export default FeedCard;
