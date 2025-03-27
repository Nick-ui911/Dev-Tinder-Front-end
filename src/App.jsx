import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./utils/Store";
import OfflineScreen from "./components/offlineScreen";
import Home from "./components/Home";
import Loader from "./components/Loader";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const FeedData = lazy(() => import("./components/FeedData"));
const Profile = lazy(() => import("./components/Profile"));
const Register = lazy(() => import("./components/Register"));
const ForgotPasswordPage = lazy(() =>
  import("./components/ForgotpasswordPage")
);
const EditProfile = lazy(() => import("./components/EditProfile"));
const Connections = lazy(() => import("./components/Connections"));
const Request = lazy(() => import("./components/Request"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Privacy = lazy(() => import("./components/Privacy"));
const TermsAndConditions = lazy(() => import("./components/TermAndCondition"));
const CancellationRefund = lazy(() =>
  import("./components/CancellationRefunds")
);
const Shipping = lazy(() => import("./components/Shipping"));
const Premium = lazy(() => import("./components/Premium"));
const Chat = lazy(() => import("./components/Chat"));

const App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <OfflineScreen />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feeddata" element={<FeedData />} />
              <Route path="/profileEdit" element={<EditProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route
                path="/termandconditions"
                element={<TermsAndConditions />}
              />
              <Route
                path="/cancellationrefund"
                element={<CancellationRefund />}
              />
              <Route path="/shipping" element={<Shipping />} />
              <Route
                path="/ForgotPasswordPage"
                element={<ForgotPasswordPage />}
              />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
            <Route path="/chat/:connectionUserId" element={<Chat />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
