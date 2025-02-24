import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { BASE_URL } from "../utils/constants";

function FeedData() {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed.feeds);
  const user = useSelector((store) => store.user);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        if (feeds.length > 0) return; // Don't fetch again if data exists

        const response = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });

        dispatch(addFeed(response.data.data));
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };

    fetchFeedData();
  }, []);

  const handleSwipe = () => {
    setIndex((prevIndex) => (prevIndex + 1) % feeds.length); // Loop back when reaching the end
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!user ? (
        <p className="text-red-500">Login first</p>
      ) : feeds.length > 0 ? (
        <FeedCard key={feeds[index]._id} {...feeds[index]} onSwipe={handleSwipe} />
      ) : (
        <p className="text-gray-500">No feeds available</p>
      )}
    </div>
  );
}

export default FeedData;
