import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBppBvk6D4D3o--GsoNRMRfcVI3M4WyIUk",
  authDomain: "joki-35417.firebaseapp.com",
  projectId: "joki-35417",
  storageBucket: "joki-35417.appspot.com",
  messagingSenderId: "289602371931",
  appId: "1:289602371931:web:02e56acb2f9d83a9ae5a7e",
  measurementId: "G-LHPDHTF15T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);


