import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/UserSlice";
import { BASE_URL } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
      fetchProfile(); // Fetch profile only when visiting /profile
    }
  }, [location.pathname]);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4 text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-6 shadow-xl rounded-2xl bg-gray-800 border border-gray-700 text-center transform transition-all hover:scale-105 hover:shadow-2xl"
      >
        
        {user?.isPremium && (
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-full shadow-lg uppercase"
          >
            {user?.membershipType} Member
          </motion.span>
        )}

        <div className="flex justify-center">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
            src={
              user?.PhotoUrl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold flex items-center justify-center gap-2">
          {user?.name || "User Name"}
          {user?.isPremium && (
            <span className="w-6 h-6 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 16.17l-3.88-3.88-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          )}
        </h2>
        <p className="text-gray-400">{user?.email || "user@example.com"}</p>
        <p className="text-gray-400">Age : {user?.age || "N/A"}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-5 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-shadow shadow-md hover:shadow-lg"
          onClick={() => navigate("/profileEdit")}
        >
          Edit Profile
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
