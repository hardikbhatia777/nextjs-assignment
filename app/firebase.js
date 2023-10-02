// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1iuXWNM2BkNw8EShFGTQY1TuZuLCJc14",
  authDomain: "assignment-7d67f.firebaseapp.com",
  projectId: "assignment-7d67f",
  storageBucket: "assignment-7d67f.appspot.com",
  messagingSenderId: "379456734121",
  appId: "1:379456734121:web:fbdb76690ad8fc10dfbab8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 