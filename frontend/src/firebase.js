import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIynmT89asUegIr7-2SB77QONgsvhtFLE",
  authDomain: "smart-disaster-alert-749e9.firebaseapp.com",
  projectId: "smart-disaster-alert-749e9",
  storageBucket: "smart-disaster-alert-749e9.firebasestorage.app",
  messagingSenderId: "673229734775",
  appId: "1:673229734775:web:1dd7d58a87f0cbfe61d772",
  measurementId: "G-CJLJFNPLXK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
