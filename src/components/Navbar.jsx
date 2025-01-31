import React, { useState } from "react";
import { useSelector } from "react-redux"; // Importing useSelector
import { Link } from "react-router-dom"; // Make sure to import Link if you're using it

const Navbar = () => {
  const user = useSelector((store) => store.user); // Accessing the Redux store
  const[loading ,setLoading] = useState(false)

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 w-full h-16 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              {/* Conditionally render the login link if no user is logged in */}
              {!user ? (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              
              ) : (
                <span className="text-lg font-semibold">{user.name}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
