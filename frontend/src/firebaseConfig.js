
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8px_nwsmZO5Uyr7KP84jAr6TwZ0dyuE8",
  authDomain: "auth-demo-43b42.firebaseapp.com",
  projectId: "auth-demo-43b42",
  storageBucket: "auth-demo-43b42.firebasestorage.app",
  messagingSenderId: "925097307731",
  appId: "1:925097307731:web:2a81ec043969e051c9e0a6",
  measurementId: "G-WL0DKJ6KCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
