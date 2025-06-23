// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCp4YXVaUMoKtcmP8gZqj6CTgnOnsy5mvw",
  authDomain: "react-app-61660.firebaseapp.com",
  projectId: "react-app-61660",
  storageBucket: "react-app-61660.firebasestorage.app",
  messagingSenderId: "388603128302",
  appId: "1:388603128302:web:b926e0d8f651f6ffe906ff",
  measurementId: "G-CP85CS90X6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export  {
    app,
    auth,
    db
};