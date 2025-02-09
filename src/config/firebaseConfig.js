// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB14lZn5l_C1zv2S0pty5d4GriSMaXcGCI",
  authDomain: "talk2type-3a564.firebaseapp.com",
  projectId: "talk2type-3a564",
  storageBucket: "talk2type-3a564.firebasestorage.app",
  messagingSenderId: "934377024510",
  appId: "1:934377024510:web:b47caf0bba7e6c328deeaf",
  measurementId: "G-P2WBBXNK6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, collection, doc, setDoc, onSnapshot };