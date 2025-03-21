import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/UserSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FiLogOut, FiUser, FiHome, FiDatabase } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => setDropdownOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

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
    <div className="fixed top-0 w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg z-10">
      {/* Logo */}
      <Link
        to="/"
        className="text-white text-3xl font-extrabold tracking-wide hover:scale-105 transition"
      >
        DevWorld
      </Link>

      {/* Navigation Icons */}
      <div className="hidden md:flex items-center gap-6 text-white text-2xl">
        <Link
          to={location.pathname === "/feeddata" ? "/" : "/feeddata"}
          className="hover:text-gray-200 transition"
        >
          {location.pathname === "/feeddata" ? <FiHome /> : <FiDatabase />}
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

      {/* User Profile & Dropdown */}
      <div className="flex items-center">
        {user ? (
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-white"
                src={user?.PhotoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <ul className="py-2 text-gray-700">
                  <li>
                    <Link
                      to={location.pathname === "/feeddata" ? "/" : "/feeddata"}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                      {location.pathname === "/feeddata" ? <FiHome /> : <FiDatabase />} 
                      {location.pathname === "/feeddata" ? "Home" : "Feed"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                      <FiUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                      <IoMdContacts /> Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/premium" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                      ⭐ Get Premium
                    </Link>
                  </li>
                  <li>
                    <Link to="/request" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                      📩 Requests
                    </Link>
                  </li>
                  <li>
                    <Link to="/ForgotPasswordPage" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200">
                      🔑 Update Password
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-white text-indigo-500 px-4 py-2 rounded-full shadow-md hover:bg-indigo-100 transition">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
