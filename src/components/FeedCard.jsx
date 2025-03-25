import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserAltSlash, FaUserCheck, FaMapMarkerAlt } from "react-icons/fa";
import maleProfile from "../assets/maleDefaultProfile.png";
import femaleProfile from "../assets/femaleDefaultProfile.png";
import { BASE_URL } from "../utils/constants";

const FeedCard = ({ _id, name, gender, age, PhotoUrl, skills, description, location, handleRemoveFeed }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestSend = async (status) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      setError("");
      if (handleRemoveFeed) handleRemoveFeed(_id);
    } catch (error) {
      setError("Failed to review request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-2xl shadow-xl overflow-hidden 
          max-w-sm sm:max-w-md w-full flex flex-col min-h-[450px] border border-gray-700">
      
      {/* Profile Image Section */}
      <div className="relative w-full h-48 sm:h-60 overflow-hidden">
        <img
          src={PhotoUrl || (gender === "Male" ? maleProfile : femaleProfile)}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col">
        {location && (
          <div className="mb-3 flex items-center gap-2 text-gray-300 text-sm">
            <FaMapMarkerAlt className="text-yellow-400" /> {location}
          </div>
        )}

        <h3 className="text-xl font-bold">{name}, {age}</h3>
        <p className="text-gray-300 text-sm">{description || "No description available"}</p>

        {/* Skills */}
        <div className="mt-4 flex-grow">
          <h4 className="text-sm uppercase text-gray-400 font-semibold tracking-wider mb-2">Skills</h4>
          {skills && skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 text-sm italic">No skills added yet</span>
          )}
        </div>
      </div>

      {/* Action Buttons / Loader */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-2xl flex justify-center">
        {isLoading ? (
          <motion.div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              ></motion.span>
            ))}
          </motion.div>
        ) : (
          <div className="flex gap-3 w-full">
            <button
              onClick={() => handleRequestSend("ignored")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center gap-2"
            >
              <FaUserAltSlash /> Ignore
            </button>
            <button
              onClick={() => handleRequestSend("interested")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex-1 flex items-center justify-center gap-2"
            >
              <FaUserCheck /> Connect
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
    </div>
  );
};

export default FeedCard;
