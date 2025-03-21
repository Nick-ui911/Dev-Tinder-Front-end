import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/UserSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.PhotoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(",") : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle File Upload to Cloudinary
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", "devworldimage-cloud");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dj7i4ts8b/image/upload",
        formData
      );
      setPhotoUrl(response.data.secure_url);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { name, PhotoUrl: photoUrl, age, gender, skills: skills.split(", ") },
        { withCredentials: true }
      );
      dispatch(addUser(response.data?.data));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      setTimeout(() => navigate("/profile"), 3000);
    } catch (error) {
      setError(error?.response?.data);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col mt-16 justify-center items-center min-h-screen p-6 bg-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="text-green-400 text-center mb-4"
          >
            Profile updated successfully!
          </motion.div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            
          />

          {/* File Upload Input */}
          <label className="block mb-2">Profile Picture:</label>
          <div className="relative w-full mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="bg-gray-700 text-white p-2 rounded-lg text-center cursor-pointer">
              Choose File
            </div>
          </div>
          
          {loading && (
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}

          {photoUrl && !loading && (
            <img
              src={photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
            />
          )}

          <label className="block mb-2">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block mb-2">Skills (comma-separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded-lg text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
