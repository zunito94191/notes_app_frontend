import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhqS_bsJgiQx13TndTCekj23Qmf-h7zpY",
  authDomain: "notes-app-29dd5.firebaseapp.com",
  projectId: "notes-app-29dd5",
  storageBucket: "notes-app-29dd5.appspot.com",
  messagingSenderId: "766361314552",
  appId: "1:766361314552:web:00e9cfecf2e751879d870d",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signWithGoogle = () => signInWithPopup(auth, provider);
