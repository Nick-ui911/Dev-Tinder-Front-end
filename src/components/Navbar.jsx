import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="fixed top-0 w-full h-20 flex items-center justify-between px-4 md:px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg z-10">
      {/* Logo */}
      <Link
        to="/"
        className="text-white text-2xl md:text-3xl font-extrabold tracking-wide hover:scale-105 transition"
      >
        DevWorld
      </Link>

      {/* Navigation Icons */}
      <div className="hidden md:flex items-center gap-6 text-white text-xl md:text-2xl">
        <Link
          to={location.pathname === "/feeddata" ? "/" : "/feeddata"}
          className="hover:text-gray-300 transition"
        >
          {location.pathname === "/feeddata" ? <FiHome /> : <FiDatabase />}
        </Link>
        <Link to="/contact" className="hover:text-gray-300 transition">
          <IoMdContacts />
        </Link>
        {user && (
          <Link to="/profile" className="hover:text-gray-300 transition">
            <FiUser />
          </Link>
        )}
      </div>

      {/* User Profile & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <img
              alt="User Avatar"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30"
              src={
                user?.PhotoUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </button>
        ) : (
          <Link to="/login" className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md hover:bg-red-700 transition">
            Login
          </Link>
        )}

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white rounded-lg shadow-lg text-sm md:text-base">
            <ul className="py-2 text-gray-700">
              <li>
                <Link
                  to={location.pathname === "/feeddata" ? "/" : "/feeddata"}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  {location.pathname === "/feeddata" ? <FiHome /> : <FiDatabase />} 
                  {location.pathname === "/feeddata" ? "Home" : "Feed"}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>
                  <FiUser /> Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>
                  <IoMdContacts /> Connections
                </Link>
              </li>
              <li>
                <Link to="/premium" className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>
                  ⭐ Get Premium
                </Link>
              </li>
              <li>
                <Link to="/request" className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>
                  📩 Requests
                </Link>
              </li>
              <li>
                <Link to="/ForgotPasswordPage" className="flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>
                  🔑 Update Password
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-3 md:px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;