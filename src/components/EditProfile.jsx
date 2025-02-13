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
  const [PhotoUrl, setPhotoUrl] = useState(user?.PhotoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(
    user?.skills ? user.skills.join(",") : ""
  );
   const [error,setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { name, PhotoUrl, age, gender, skills: skills.split(", ") },
        { withCredentials: true }
      );
      dispatch(addUser(response.data?.data));
      alert("Profile updated successfully!")
      
    } catch (error) {
      setError(error?.response?.data)
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-4  text-gray-900">Edit Profile</h2>
        {error && <span className="text-red-500 text-sm">{error}</span>} {/* Error message display */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-900">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border  text-gray-900 rounded-lg border-gray-900"
            required
          />

          <label className="block mb-2  text-gray-900">Photo URL:</label>
          <input
            type="text"
            value={PhotoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full p-2 mb-4 border  text-gray-900 rounded-lg  border-gray-900 "
          />

          <label className="block mb-2 text-gray-900 ">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 mb-4  text-gray-900 border rounded-lg  border-gray-900"
          />

          <label className="block mb-2  text-gray-900">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg  text-gray-900 border-gray-900"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block mb-2   text-gray-900 border-gray-900">
            Skills (comma-separated):
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg  text-gray-900 border-gray-900"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700  text-gray-900"
          >
            Save Changes
          </button>
        </form>
      </div>
      <FeedCard
        name={name}
        age={age}
        gender={gender}
        PhotoUrl={PhotoUrl}
        skills={skills.split(", ")}
      />
    </div>
  );
};

export default EditProfile;
