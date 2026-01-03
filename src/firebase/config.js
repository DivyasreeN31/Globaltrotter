// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3s3EoHWYmkPiEz-K4INFIVT77kTx4Nqk",
  authDomain: "globetrotter-53a4a.firebaseapp.com",
  projectId: "globetrotter-53a4a",
  storageBucket: "globetrotter-53a4a.firebasestorage.app",
  messagingSenderId: "85727982344",
  appId: "1:85727982344:web:ad2b8e381c1da1f885f2bd",
  measurementId: "G-Q3408YVF8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;

