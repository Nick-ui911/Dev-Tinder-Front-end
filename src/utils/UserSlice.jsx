import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});
export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;

// default import is access by import UserSlice from "./UserSlice"
// named import is access by import { addUser, removeUser } from "./UserSlice"
