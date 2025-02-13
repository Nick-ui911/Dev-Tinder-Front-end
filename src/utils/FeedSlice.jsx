import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  feeds: [], // Store the requests in an array
};

const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      state.feeds = action.payload;
    },
    removeFeed: (state, action) => {
      state.feeds = state.feeds.filter(
        (val) => val._id !== action.payload
      );
    },
  },
});
export const { addFeed, removeFeed } = FeedSlice.actions;
export default FeedSlice.reducer;
