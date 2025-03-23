import { useState, useEffect } from "react";

const useOnline = () => {
  const [onlinecheck, setOnlineCheck] = useState(navigator.onLine);

  useEffect(() => {
    const online = () => {
      setOnlineCheck(true);
    };

    const offline = () => {
      setOnlineCheck(false);
    };

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    // below is for good practice because we don't need it when we are changing page;
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);
  return onlinecheck;
};
export default useOnline;
