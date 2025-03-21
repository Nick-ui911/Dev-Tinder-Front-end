import React, { useEffect } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { BASE_URL } from "../utils/constants";

function FeedData() {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed.feeds);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(response.data.data));
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };

    fetchFeedData();
  }, [dispatch]);

  return (
    <div className="min-h-screen my-16 p-8 bg-gray-900 text-white">
      {!user ? (
        <p className="text-red-500 text-center text-lg">Login first</p>
      ) : feeds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feeds.map((feed) => (
            <FeedCard key={feed._id} {...feed} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-xl font-bold text-center mt-10">
          🎉 No more feeds available! 🎉
        </p>
      )}
    </div>
  );
}

export default FeedData;