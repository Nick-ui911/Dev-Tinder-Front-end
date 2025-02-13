import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [], // Store the requests in an array
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests = action.payload; // Ensure payload is an array
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter((val) => val._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
