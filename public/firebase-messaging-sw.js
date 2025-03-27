importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

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
  console.log("Received background message ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon:"/logodevworld.jpg",
  });
});
