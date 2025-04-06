import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/UserSlice";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import { FiMail, FiStar } from "react-icons/fi";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching profile", error);
      }
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      fetchProfile();
    }
  }, [location.pathname]);

  const skillsArray = Array.isArray(user?.skills)
    ? user.skills.flatMap((skill) => skill.split(","))
    : ["Not specified"];

  return (
    <div className="flex justify-center mt-16 items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 shadow-2xl rounded-3xl bg-gray-850 border border-gray-500 text-center hover:scale-105 transition-all"
      >
        {/* Premium Badge */}
        {user?.isPremium && (
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-2 sm:right-4 bg-yellow-400 text-black px-3 py-1 text-xs sm:text-sm font-bold rounded-full shadow-md flex items-center gap-1 uppercase"
          >
            <FiStar className="text-black w-4 h-4 sm:w-5 sm:h-5" />
            <span className="truncate">{user?.membershipType} Member</span>
          </motion.span>
        )}

        {/* Profile Picture */}
        <div className="flex justify-center">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg hover:shadow-2xl transition"
            src={
              user?.PhotoUrl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-3xl font-extrabold flex items-center justify-center gap-2 text-white">
          {user?.name || "User Name"}
          {user?.isPremium && <FiStar className="text-yellow-400 w-6 h-6" />}
        </h2>

        {/* Location */}
        {user?.location && (
          <p className="flex items-center justify-center gap-2 mt-1 text-lg text-gray-300">
            <FaMapMarkerAlt className="text-yellow-400" /> {user.location}
          </p>
        )}

        {/* Email */}
        <p className="text-gray-300 flex items-center justify-center gap-2 mt-1 text-lg">
          <FiMail /> {user?.email || "user@example.com"}
        </p>

        {/* Other Details */}
        <div className="mt-4 space-y-3 text-gray-300 text-lg">
          {!user?.gender && (
            <div className="flex items-center gap-2 mt-4 bg-red-500 bg-opacity-20 text-red-400 px-4 py-2 rounded-lg shadow-sm">
              <FaUserEdit className="text-red-400 w-6 h-6" />
              <span>Please complete your profile (Add Age and Gender)!</span>
            </div>
          )}
          <p>
            🚻 Gender:{" "}
            <span className="font-semibold">
              {user?.gender ? user.gender : "Not provided"}
            </span>
          </p>
          {/* Description Section */}
          <p>
            📝 About Me:{" "}
            <span className="font-semibold">
              {user?.description || "No description available"}
            </span>
          </p>

          {/* Skills Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-400">Skills</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {skillsArray.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full shadow-md hover:bg-blue-500 transition"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-full hover:bg-blue-600 transition-shadow shadow-md hover:shadow-lg"
            onClick={() => navigate("/profileEdit")}
          >
            <FaUserEdit /> Edit Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
