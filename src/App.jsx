import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./utils/Store";
import OfflineScreen from "./components/offlineScreen";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { messaging } from "./utils/firebase"; // Ensure correct import
import { onMessage } from "firebase/messaging";

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
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 Foreground Notification Received:", payload);

      if (!payload.notification) return;

      const currentPath = window.location.pathname;
      const isInChat = currentPath.startsWith("/chat"); // Adjust based on your app's chat route

      if (!isInChat) {
        toast.info(`📩 ${payload.notification.title}: ${payload.notification.body}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
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
        
        {/* ✅ Toast Container for Notifications */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
