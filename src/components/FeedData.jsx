import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { BASE_URL } from "../utils/constants";

function FeedData() {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed.feeds);
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(response.data.data));
        console.log(response)
      } catch (error) {
        console.error("Error fetching feeds:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedData();
  }, [dispatch]);

  // Filter feeds based on search query
  const filteredFeeds = feeds.filter((feed) =>
    feed.skills?.some((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen my-20 p-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      {!user ? (
        <p className="text-red-500 text-center text-lg">Login first</p>
      ) : (
        <>
          {/* 🔍 Search Input */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center mt-20">
              <Loader />
            </div>
          ) : filteredFeeds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFeeds.map((feed) => (
                <FeedCard key={feed._id} {...feed} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xl font-bold text-center mt-10">
              {searchQuery ? "No results found for your search!" : "🎉 No more feeds available! 🎉"}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default FeedData;
