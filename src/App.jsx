import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Store from "./utils/Store";
import { Provider } from "react-redux";
import FeedData from "./components/FeedData"; // Import the FeedData component
import Profile from "./components/Profile";
import Register from "./components/Register";
import ForgotpasswordPage from "./components/ForgotpasswordPage";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feeddata" element={<FeedData />} />
            <Route path="/profileEdit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ForgotPasswordPage" element={<ForgotpasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
