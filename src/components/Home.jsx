import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Function to fetch user profile
  const ProfileView = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true, // Ensure backend supports this
      });
      dispatch(addUser(res.data)); // Dispatch user data to Redux
    } catch (error) {
      // If 401 error, redirect to login
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching profile", error);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      ProfileView(); // Fetch profile only if user is not available in Redux
    }
  }, [user, dispatch]); // Run when `user` state changes

  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will display Feed or Login based on route */}
      <Footer />
    </div>
  );
};

export default Home;
