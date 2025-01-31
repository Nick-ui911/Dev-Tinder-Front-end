import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Store from "./utils/Store";
import { Provider } from "react-redux";
import FeedData from "./components/FeedData"; // Import the FeedData component

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feeddata" element={<FeedData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
