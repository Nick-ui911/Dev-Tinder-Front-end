import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/UserSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
 try {
  await axios.post(BASE_URL + "/logout",{},{ withCredentials: true })

  dispatch(removeUser()); // Dispatch logout action
  return navigate("/login")
 } catch (error) {
  console.error(error);
  
 }
  };


  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 w-full h-16 z-10">
      <div className="flex-1">
        <Link to="/feeddata" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
