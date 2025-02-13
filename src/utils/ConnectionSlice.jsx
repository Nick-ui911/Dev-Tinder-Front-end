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
      state.connections = state.connections.filter(
        (val) => val._id !== action.payload
      );
    },
  },
});

export const { addConnections, removeConnection } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
