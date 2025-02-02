import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar"; // Ensure this import is correct
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const ProfileView = async () => {
    if (user) return; // Ensure this check works as expected
    const token = localStorage.getItem("token"); // Check if token exists

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }
  
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true, // Ensure backend supports this
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) { // Corrected error handling
        navigate("/login");
      }
      
    }
  };
  useEffect(() => {
    if (!user) ProfileView();
  }, [user]);

  return (
    <div>
      <Navbar />
      <Outlet /> {/* This is where Feed or Login will be displayed */}
      <Footer />
    </div>
  );
};

export default Home;
