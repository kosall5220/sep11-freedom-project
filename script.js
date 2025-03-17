
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7rquDnPgGYCy-z9CZOyCT1gYuokA1vFY",
    authDomain: "sep11-freedom-project-e57af.firebaseapp.com",
    databaseURL: "https://sep11-freedom-project-e57af-default-rtdb.firebaseio.com",
    projectId: "sep11-freedom-project-e57af",
    storageBucket: "sep11-freedom-project-e57af.firebasestorage.app",
    messagingSenderId: "854302404692",
    appId: "1:854302404692:web:44f91df0d537c642eb3dc1",
    measurementId: "G-GV5S6GXRL0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
