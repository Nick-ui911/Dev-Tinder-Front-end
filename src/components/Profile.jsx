import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/UserSlice";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (!user) {
      fetchProfile();
    }
  }, [user, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white border border-gray-300 text-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
            src={
              user?.PhotoUrl ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
            }
            alt="Profile"
          />
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          {user?.name || "User Name"}
        </h2>
        <p className="text-gray-600">{user?.email || "user@example.com"}</p>

        {/* Edit Profile Button */}
        <button
          className="mt-6 px-5 py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition shadow-md"
          onClick={() => navigate("/profileEdit")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
