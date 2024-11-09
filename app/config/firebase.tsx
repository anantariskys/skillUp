import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBppBvk6D4D3o--GsoNRMRfcVI3M4WyIUk",
  authDomain: "joki-35417.firebaseapp.com",
  projectId: "joki-35417",
  storageBucket: "joki-35417.firebasestorage.app",
  messagingSenderId: "289602371931",
  appId: "1:289602371931:web:02e56acb2f9d83a9ae5a7e",
  measurementId: "G-LHPDHTF15T",
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
