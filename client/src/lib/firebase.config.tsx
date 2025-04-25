import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Can be public
const firebaseConfig = {
  apiKey: "AIzaSyCs9VxHO69n6Z_S8fbgpMfvhdah-i9zspk",
  authDomain: "capsum-5e2ac.firebaseapp.com",
  projectId: "capsum-5e2ac",
  storageBucket: "capsum-5e2ac.firebasestorage.app",
  messagingSenderId: "940883908474",
  appId: "1:940883908474:web:cb5e4a3cb21231d12d68c3",
  measurementId: "G-LYCLKLRBQT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
