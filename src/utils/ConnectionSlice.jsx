import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [], // Store the connections in an object
};

const ConnectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload; // Store the fetched connections in `connections`
    },
    removeConnection: (state) => {
      state.connections = []; // Clear the connections array (do not return null)
    },
  },
});

export const { addConnections, removeConnection } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
