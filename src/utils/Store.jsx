import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice"
import FeedSlice from "./FeedSlice"

const Store = configureStore({
  reducer: { 
    user: UserSlice, 
    feed:FeedSlice,
  }
});

export default Store;
