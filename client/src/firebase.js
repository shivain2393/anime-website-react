// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "anime-website-5367a.firebaseapp.com",
  projectId: "anime-website-5367a",
  storageBucket: "anime-website-5367a.appspot.com",
  messagingSenderId: "281475795011",
  appId: "1:281475795011:web:ed01caee551fb6e4812cf6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);