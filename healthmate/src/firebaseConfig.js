// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8GUKDSXH63lLVZtnRDLbw5PaL6lVniVM",
  authDomain: "healthmate-1f3a6.firebaseapp.com",
  projectId: "healthmate-1f3a6",
  storageBucket: "healthmate-1f3a6.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "1031780452119",
  appId: "1:1031780452119:web:b7b6f6004b0de1d246d952",
  measurementId: "G-X30NDH7FVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
