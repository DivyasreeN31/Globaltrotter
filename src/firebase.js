import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
export default app;
