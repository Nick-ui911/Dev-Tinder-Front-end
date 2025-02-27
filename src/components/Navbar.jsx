import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/UserSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {  FiUser, FiHome } from "react-icons/fi"; // Import icons
import { IoMdContacts } from "react-icons/io";


const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md z-10">
      {/* Left - Logo */}
      <Link to="/feeddata" className="text-white text-2xl font-bold">
        DevTinder
      </Link>

      {/* Center - Navigation Icons */}
      <div className="flex items-center gap-6 text-white text-2xl">
        <Link to="/" className="hover:text-gray-200 transition">
          <FiHome />
        </Link>
        <Link to="/contact" className="hover:text-gray-200 transition">
        <IoMdContacts />
        </Link>
        {user && (
          <Link to="/profile" className="hover:text-gray-200 transition">
            <FiUser />
          </Link>
        )}
      </div>

      {/* Right - Profile or Login */}
      <div className="flex items-center">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user?.PhotoUrl ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to="/profile" className="text-sm font-semibold">
                  Show Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="text-sm font-semibold">
                  Show Connections
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-sm font-semibold">
                  Request
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-error w-full">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className=" btn glass bg-gray-800 text-red-500 px-4 py-2 rounded-full shadow-lg hover:bg-gray-900 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
