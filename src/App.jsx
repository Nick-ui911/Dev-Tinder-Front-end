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
import Connections from "./components/Connections";
import Request from "./components/Request";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import TermsAndConditions from "./components/TermAndCondition";
import CancellationRefund from "./components/CancellationRefunds";
import Shipping from "./components/Shipping";
import Premium from "./components/Premium";

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/feeddata" element={<FeedData />} />
            <Route path="/profileEdit" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termandconditions" element={<TermsAndConditions/>} />
            <Route path="/cancellationrefund" element={<CancellationRefund/>} />
            <Route path="/shipping" element={<Shipping/>} />
            <Route
              path="/ForgotPasswordPage"
              element={<ForgotpasswordPage />}
            />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Request />} />
            <Route path="/premium" element={<Premium />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
