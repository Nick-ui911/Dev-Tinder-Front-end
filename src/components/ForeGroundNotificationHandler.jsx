import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { onMessage } from "firebase/messaging";
import { messaging } from "../utils/firebase"; // Ensure correct Firebase import
const ForeGroundNotificationHandler = () => {
    const location = useLocation(); // ✅ Now inside <Router>, no error

    useEffect(() => {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("📩 Foreground Notification Received:", payload);
  
        const title = payload?.notification?.title || payload?.data?.title;
        const body = payload?.notification?.body || payload?.data?.body;
  
        if (!title || !body) {
          console.warn("⚠️ Missing title or body in payload:", payload);
          return;
        }
  
        // ✅ Block notifications only in chat
        if (!location.pathname.startsWith("/chat/")) {
          toast.info(`📩 ${title}: ${body}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.log("🔕 Notification blocked on chat page.");
        }
      });
  
      return () => unsubscribe(); // Cleanup listener
    }, [location]); // ✅ Runs when route changes
  
    return null; // This component doesn't render anything
}

export default ForeGroundNotificationHandler
