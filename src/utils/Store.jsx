import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice"
import FeedSlice from "./FeedSlice"
import ConnectionSlice from "./ConnectionSlice";
import RequestSlice from "./RequestSlice"


const Store = configureStore({
  reducer: { 
    user: UserSlice, 
    feed:FeedSlice,
    connection:ConnectionSlice,
    request:RequestSlice,
  }
});

export default Store;
