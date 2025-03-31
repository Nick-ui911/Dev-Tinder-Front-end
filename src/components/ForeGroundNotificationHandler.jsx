import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { onMessage } from "firebase/messaging";
import { messaging } from "../utils/firebase"; // Ensure correct Firebase import
const ForeGroundNotificationHandler = () => {
  const location = useLocation(); // ✅ Now inside <Router>, no error

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      // console.log("📩 Foreground Notification Received:", payload);

      const title = payload?.notification?.title || payload?.data?.title;
      const body = payload?.notification?.body || payload?.data?.body;

      if (!title || !body) {
        console.warn("⚠️ Missing title or body in payload:", payload);
        return;
      }

      // ✅ Block notifications only in chat
      if (!location.pathname.startsWith("/chat/")) {
        // Custom Toast
        toast.info(
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-3 rounded-lg shadow-lg w-full sm:w-80 md:w-96">
            <p className="font-semibold text-base sm:text-lg">📩 {title}</p>
            <p className="text-xs sm:text-sm">{body}</p>
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", // Ensures dark styling
          }
        );
      } else {
        console.log("🔕 Notification blocked on chat page.");
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [location]); // ✅ Runs when route changes

  return null; // This component doesn't render anything
};

export default ForeGroundNotificationHandler;
