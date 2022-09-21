import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzAEJmzdMVrnbiLLBLdfNwjxqZaxAFszA",
  authDomain: "regal-net-361307.firebaseapp.com",
  projectId: "regal-net-361307",
  storageBucket: "regal-net-361307.appspot.com",
  messagingSenderId: "94452383739",
  appId: "1:94452383739:web:730f571094773eaaf3155e",
  measurementId: "G-39K0C1FKFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
