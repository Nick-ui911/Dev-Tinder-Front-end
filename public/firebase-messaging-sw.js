importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBIyNHFwdD5jH5sCar2CwRStaTJGU2lyCI",
  authDomain: "devworld-44971.firebaseapp.com",
  projectId: "devworld-44971",
  storageBucket: "devworld-44971.appspot.com", // Fixed typo in storageBucket
  messagingSenderId: "830071626560",
  appId: "1:830071626560:web:1f32045efc6f67870638a5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ✅ Handle background notifications
messaging.onBackgroundMessage((payload) => {
  // console.log("📩 Received Background Notification:", payload);

  const { title, body } = payload.notification || payload.data;
  const iconUrl = "https://devworld.in/logodevworld.png";
  const clickUrl = payload.data?.click_action || "https://devworld.in/";

  // Ensure notifications don’t stack unnecessarily
  self.registration.getNotifications().then((existingNotifications) => {
    const isDuplicate = existingNotifications.some((n) => n.title === title);
    if (!isDuplicate) {
      self.registration.showNotification(title, {
        body: body,
        icon: iconUrl,
        badge: iconUrl,
        tag: payload.messageId, // Helps avoid duplicate notifications
        data: { url: clickUrl }, // Store click action URL here
      });
    }
  });
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close notification when clicked

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const targetUrl = event.notification.data?.url || "https://devworld.in/";
      const chatPath = new URL(targetUrl).pathname; // Extract /chat/:id
      
      const matchingClient = clientList.find((client) => client.url === "https://devworld.in/");

      if (matchingClient) {
        // If the app is already open, navigate to chat
        matchingClient.focus();
        matchingClient.postMessage({ type: "OPEN_CHAT", path: chatPath });
      } else {
        // Open the app first, then navigate to chat
        return clients.openWindow("https://devworld.in/");
      }
    })
  );
});
