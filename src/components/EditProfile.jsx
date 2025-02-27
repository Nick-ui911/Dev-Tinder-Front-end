import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";
import { addUser } from "../utils/UserSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(",") : "");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(user?.PhotoUrl || "https://via.placeholder.com/150");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { name, age, gender, skills: skills.split(", ") },
        { withCredentials: true }
      );
      dispatch(addUser(response.data?.data));
      alert("Profile updated successfully!");
    } catch (error) {
      setError(error?.response?.data);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 md:p-6 space-y-6 md:space-y-0 md:space-x-6 my-16">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Profile</h2>
        {error && <span className="text-red-500 text-sm">{error}</span>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2 text-gray-900">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border text-gray-900 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Profile Photo Upload */}
          <label className="block mb-2 text-gray-900">Profile Picture:</label>
          <div className="flex items-center gap-4 mb-4">
            <img className="w-20 h-20 rounded-full border-2 border-gray-400" src={preview} alt="Profile Preview" />
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Age */}
          <label className="block mb-2 text-gray-900">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 mb-4 text-gray-900 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Gender */}
          <label className="block mb-2 text-gray-900">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Skills */}
          <label className="block mb-2 text-gray-900">Skills (comma-separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Save Changes Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Preview Card */}
      <FeedCard
        name={name}
        age={age}
        gender={gender}
        PhotoUrl={preview}
        skills={skills.split(", ")}
      />
    </div>
  );
};

export default EditProfile;
