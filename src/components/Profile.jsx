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
      <div className="relative w-full max-w-md p-6 shadow-xl rounded-2xl bg-white border border-gray-300 text-center transform transition-all hover:scale-105">
        
        {/* Premium Badge in Top Right */}
        {user?.isPremium && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-full shadow-lg uppercase">
            {user?.membershipType} Member
          </span>
        )}

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

        {/* User Info with Blue Tick */}
        <h2 className="mt-4 text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
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
        <p className="text-gray-600">{user?.email || "user@example.com"}</p>

        {/* Edit Profile Button */}
        <button
          className="mt-6 px-5 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-shadow shadow-md hover:shadow-lg"
          onClick={() => navigate("/profileEdit")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
