import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


// it is for background notification click ?

//Ans - Yes, this is for handling background notification clicks — specifically when a push notification is clicked and the app is already open (in a tab).

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
