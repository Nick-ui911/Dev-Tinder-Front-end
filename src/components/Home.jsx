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
  const ProfileView = async () => {
    if (user) return; // Ensure this check works as expected

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true, // Ensure backend supports this
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        // Corrected error handling
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if (!user) ProfileView();
  }, [user]);

  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will display Feed or Login based on route */}
      <Footer />
    </div>
  );
};

export default Home;
