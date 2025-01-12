// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDejvD8fttzSVTlx5YqZGvqv3ty75zu9_k",
  authDomain: "nettle-api.firebaseapp.com",
  projectId: "nettle-api",
  storageBucket: "nettle-api.firebasestorage.app",
  messagingSenderId: "286568484059",
  appId: "1:286568484059:web:cdae6cff325a60152b90fe",
  measurementId: "G-W5PPQL6HKT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword };
