importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBIyNHFwdD5jH5sCar2CwRStaTJGU2lyCI",
  authDomain: "devworld-44971.firebaseapp.com",
  projectId: "devworld-44971",
  storageBucket: "devworld-44971.firebasestorage.app",
  messagingSenderId: "830071626560",
  appId: "1:830071626560:web:1f32045efc6f67870638a5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  // console.log("📩 Received Background Notification:", payload);

  if (!payload.notification) return; // Prevent errors

  // ✅ Prevent duplicate notifications
  self.registration.getNotifications().then((existingNotifications) => {
    // Check if a similar notification already exists
    const isDuplicate = existingNotifications.some(
      (n) => n.title === payload.notification.title
    );

    if (!isDuplicate) {
      self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "https://devworld.in/logodevworld.jpg", // Make sure this path is correct!
        tag: payload.messageId, // Helps prevent duplicates
        data: { click_action: payload.data.click_action },
      });
    }
  });
});
// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data.click_action);
    })
  );
});

