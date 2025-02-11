import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [], // Store the connections in an object
};

const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequest: (state, action) => {
        state.requests = action.payload; // Store the fetched connections in `connections`
    },
    removeRequest: (state) => {
        state.requests = []; // Clear the connections array (do not return null)
    },
  },
});

export const { addRequest, removeRequest } = RequestSlice.actions;
export default RequestSlice.reducer;