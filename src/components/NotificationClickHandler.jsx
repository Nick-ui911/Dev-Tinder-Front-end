import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationClickHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.type === "OPEN_CHAT" && event.data.path) {
          navigate(event.data.path); // Navigate to chat page
        }
      });
    }, [navigate]);
  
    return null; // This component doesn't render anything
}

export default NotificationClickHandler;
