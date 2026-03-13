import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config - uses env variables if available, otherwise uses fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "strategabot-e1afd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "strategabot-e1afd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "strategabot-e1afd.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "0",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "placeholder-app-id",
};

let db = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed, running in offline mode:", error);
}

export { db };
