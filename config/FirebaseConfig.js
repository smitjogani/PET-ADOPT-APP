import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-90a84.firebaseapp.com",
  projectId: "pet-adopt-90a84",
  storageBucket: "pet-adopt-90a84.appspot.com",
  messagingSenderId: "497599060578",
  appId: "1:497599060578:web:907ae3a29bff65f3e10f3b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);