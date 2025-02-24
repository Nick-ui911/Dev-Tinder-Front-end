import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { motion, useAnimation } from "framer-motion";
import { BASE_URL } from "../utils/constants";

const FeedCard = ({ _id, name, gender, age, PhotoUrl, skills, onSwipe }) => {
  const controls = useAnimation();
  const [error, setError] = useState("");

  const handleRequestSend = async (status) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
      setError("");
    } catch (error) {
      setError("Failed to review request");
    }
  };

  const handleSwipeAction = async (direction) => {
    if (direction === "left") {
      await controls.start({ x: "-100vw", opacity: 0, transition: { duration: 0.5 } });
      handleRequestSend("ignored");
    } else {
      await controls.start({ x: "100vw", opacity: 0, transition: { duration: 0.5 } });
      handleRequestSend("interested");
    }

    setTimeout(() => {
      controls.set({ x: 0, opacity: 1 }); // Reset position for next card
      onSwipe(); // Show next card
    }, 500);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handleSwipeAction("left");
      } else if (event.key === "ArrowRight") {
        handleSwipeAction("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeAction("left"),
    onSwipedRight: () => handleSwipeAction("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="flex justify-center items-center p-4 my-16">
      <motion.div
        animate={controls}
        initial={{ x: 0, opacity: 1 }}
        className="relative w-96 bg-white shadow-2xl rounded-3xl overflow-hidden transform transition hover:scale-105 duration-300"
      >
        <figure>
          <img
            src={PhotoUrl || "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg"}
            alt={name}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
        </figure>
        <div className="p-6 pb-24">
          <h2 className="text-2xl font-extrabold text-gray-800">{name}, {age}</h2>
          <p className="text-gray-500 text-sm">{gender}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Adjusted Buttons Position */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8">
          <button
            onClick={() => handleSwipeAction("left")}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white text-2xl shadow-lg transform transition hover:scale-110 hover:bg-red-600"
          >
            ❌
          </button>
          <button
            onClick={() => handleSwipeAction("right")}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white text-2xl shadow-lg transform transition hover:scale-110 hover:bg-green-600"
          >
            ❤️
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedCard;
