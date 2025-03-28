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
//  yaha bhi hua hai ctrl+z do 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();


// ✅ Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background Notification Received:", payload);

  if (!payload.data) return; // Ensure payload contains data

  const { title, body, click_action, messageId } = payload.data;

  self.registration.showNotification(title, {
    body,
    icon: "https://devworld.in/logodevworld.jpg", // ✅ Ensure this image exists on your server
    tag: messageId, // Helps prevent duplicate notifications
    data: { click_action },
  });
});

// ✅ Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(event.notification.data.click_action) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(event.notification.data.click_action);
    })
  );
});