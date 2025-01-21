import { initializeApp } from "firebase/app";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJVUM8tCdSBm9NYTqokT1_K6w0wwpG80o",
  authDomain: "barber-ad6c5.firebaseapp.com",
  projectId: "barber-ad6c5",
  storageBucket: "barber-ad6c5.firebasestorage.app",
  messagingSenderId: "392571293815",
  appId: "1:392571293815:web:07067a1d9dcac8349a3672",
  measurementId: "G-XCDEYRM45V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in popup was closed. Please try again.");
    } else {
      throw new Error(error.message);
    }
    throw error;
  }
};

export { auth, db, createUserWithEmailAndPassword, sendEmailVerification, signInWithGoogle };