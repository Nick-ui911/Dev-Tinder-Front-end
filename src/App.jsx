import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Store from "./utils/Store";
import { Provider } from "react-redux";
import Feed from "./components/Feed";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
