// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2qrYC0M-_tTAWqbVcIX1ng3jFH4D61oE",
  authDomain: "netflixgpt-c1d4a.firebaseapp.com",
  projectId: "netflixgpt-c1d4a",
  storageBucket: "netflixgpt-c1d4a.appspot.com",
  messagingSenderId: "1021025516948",
  appId: "1:1021025516948:web:1984cb5ec8f8d6050da381",
  measurementId: "G-F8J57MT543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();