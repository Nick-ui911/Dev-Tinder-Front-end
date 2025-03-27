import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { BASE_URL } from "./constants";
import axios from "axios";
const firebaseConfig = {
  apiKey: "AIzaSyBIyNHFwdD5jH5sCar2CwRStaTJGU2lyCI",
  authDomain: "devworld-44971.firebaseapp.com",
  projectId: "devworld-44971",
  storageBucket: "devworld-44971.firebasestorage.app",
  messagingSenderId: "830071626560",
  appId: "1:830071626560:web:1f32045efc6f67870638a5",
  measurementId: "G-TTYL9J1EYX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Request Notification Permission & Get Token
export const requestNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BDQdQjzVzVowhC0824q9-ze0ZBmrJKxoSEP1FMq7XyD_h8aycPzHK9SdGIKo2WBsE65T_hFuVhfHnRUKEOZDw3A",
      });

      console.log("🔹 FCM Token:", token);

      // ✅ Send FCM token to backend
      await axios.post(BASE_URL + "/update-fcm-token", { userId, fcmToken: token },{
        withCredentials:true,
      });
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// ✅ Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("🔔 Foreground Notification:", payload);
  alert(`New message from ${payload.notification.title}: ${payload.notification.body}`);
});

export { messaging, getToken, onMessage };
