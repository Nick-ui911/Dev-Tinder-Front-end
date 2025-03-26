import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { addUser } from "../utils/UserSlice";

const Contact = () => {
  const user = useSelector((store) => store.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.pathname === "/contact") {
      fetchProfile();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(BASE_URL + "/send-email", {
        name,
        email,
        message,
      });

      if (response.data.success) {
        toast.success("✅ Message Sent Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("❌ Failed to send message. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("⚠️ An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900  flex flex-col items-center justify-center p-6"
    >
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Contact Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-16 mb-8"
      >
        <h1 className="text-5xl font-bold text-white">Contact Us</h1>
        <p className="text-lg text-white mt-2">
          Got a question? We'd love to hear from you!
        </p>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 shadow-xl rounded-lg p-8 w-full max-w-lg"
      >
        <form onSubmit={handleSubmit}>
          <motion.div
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4"
          >
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              required
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4"
          >
            <label className="block text-white-700 font-semibold mb-2">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              required
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-4"
          >
            <label className="block text-white font-semibold mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              // required
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-lg hover:shadow-2xl transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
