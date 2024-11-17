import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9ou07xRM-5_BXJB3XJudBy68v6ZwOHSo",
  authDomain: "skillup-a9252.firebaseapp.com",
  projectId: "skillup-a9252",
  storageBucket: "skillup-a9252.firebasestorage.app",
  messagingSenderId: "1043254154857",
  appId: "1:1043254154857:web:6e8b3fda4f2f5ba5e934f8",
  measurementId: "G-BVR1RJSPHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);


