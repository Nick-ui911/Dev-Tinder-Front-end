import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../utils/constants";
import {
  FaUser,
  FaCode,
  FaMale,
  FaFemale,
  FaUserAltSlash,
  FaUserCheck,
  FaMapMarkerAlt
} from "react-icons/fa";
import maleProfile from "../assets/maleDefaultProfile.png";
import femaleProfile from "../assets/femaleDefaultProfile.png";

const FeedCard = ({ _id, name, gender, age, PhotoUrl, skills, description, location }) => {
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Stagger effect for multiple cards rendering
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 300);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleRequestSend = async (status) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      setError("");
      
      // Add a small delay before removing the card for better UX
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    } catch (error) {
      setError("Failed to review request");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  const genderIcon = gender === "Male" ? 
    <FaMale className="text-blue-400" /> : 
    <FaFemale className="text-pink-400" />;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };
// console.log(skills,location,description)
  return (
    <AnimatePresence>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-2xl shadow-xl overflow-hidden 
          max-w-sm sm:max-w-md w-full flex flex-col min-h-[450px] border border-gray-700"
      >
        {/* Profile Image Section with Overlay */}
        <div className="relative w-full h-48 sm:h-60 overflow-hidden group">
          <motion.img
            src={PhotoUrl || (gender === "Male" ? maleProfile : femaleProfile)}
            alt={name}
            className="w-full h-full object-cover shadow-lg transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          
          {/* Floating Name Badge */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {genderIcon} {name}, {age}
              </h3>
            </div>
      
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Location if available */}
          {location && (
            <div className="mb-3 flex items-center gap-2 text-gray-300 text-sm">
              <FaMapMarkerAlt className="text-yellow-400" /> {location}
            </div>
          )}

          {/* Description Section */}
          <motion.div 
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm uppercase text-gray-400 font-semibold tracking-wider mb-1">About</h4>
            <p className="text-gray-300 text-sm">
              {description || "No description available"}
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            className="mt-4 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm uppercase text-gray-400 font-semibold tracking-wider mb-2">Skills</h4>
            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full 
                      text-xs font-medium shadow-md flex items-center gap-1 hover:from-blue-500 
                      hover:to-blue-400 transition-colors duration-300"
                  >
                    <FaCode /> {skill}
                  </motion.span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 text-sm italic">No skills added yet</span>
            )}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
          <div className="flex justify-between gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              onClick={() => handleRequestSend("ignored")}
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg flex-1
                flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-300"
            >
              <FaUserAltSlash /> Ignore
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              onClick={() => handleRequestSend("interested")}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg flex-1
                flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-300"
            >
              <FaUserCheck /> Connect
            </motion.button>
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center mt-2 font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedCard;