import axios from "axios";
import React, { useEffect } from "react";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { BASE_URL } from "../utils/constants";

function FeedData() {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const fetchFeedData = async () => {
    try {
      if (feeds?.length) return; // Prevents API call if feeds exist

      const response = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    

      dispatch(addFeed(response.data.data)); // Ensure correct state update
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []); // Re-run if `feeds` changes



  return (
    <div className="flex flex-col items-center my-16 gap-4 p-4">
      {feeds?.length > 0 ? (
        feeds.map((feed, index) => <FeedCard key={index} {...feed} />)
      ) : (
        <p className="text-gray-500">No feeds available</p>
      )}
    </div>
  );
}

export default FeedData;
