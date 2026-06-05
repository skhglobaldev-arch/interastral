
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Use the lite version of the Firestore SDK to resolve import errors in restricted environments
import { getFirestore } from "firebase/firestore/lite";

// Your real configuration for interastralvision
const firebaseConfig = {
  apiKey: "AIzaSyDUF-V5gUlaial6p_HkhX4PZ-JEYNxLaS8",
  authDomain: "interastral-96645.firebaseapp.com",
  projectId: "interastral-96645",
  storageBucket: "interastral-96645.firebasestorage.app",
  messagingSenderId: "300720518280",
  appId: "1:300720518280:web:83ea0e4147b1d9aa33db3d",
  measurementId: "G-8KVWSPKGKL"
};

// Initialize Firebase (Modular SDK)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firestore using the getFirestore function
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };
