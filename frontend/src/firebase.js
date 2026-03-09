import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9vVsVP_f9l8eRfEuFNph186VwCaUKXpY",
  authDomain: "prem0703-cbef2.firebaseapp.com",
  projectId: "prem0703-cbef2",
  storageBucket: "prem0703-cbef2.appspot.com",
  messagingSenderId: "663041914703",
  appId: "1:663041914703:web:7c655906689bdddbcf373a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication
export const auth = getAuth(app);

// Export Firestore Database
export const db = getFirestore(app);

