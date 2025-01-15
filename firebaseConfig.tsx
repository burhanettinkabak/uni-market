// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Your Firebase API Key",
  authDomain: "Your Firebase Auth Domain",
  projectId: "Your Firebase Project ID",
  storageBucket: "Your Firebase Storage Bucket",
  messagingSenderId: "Your Firebase Messaging Sender ID",
  appId: "Your Firebase App ID",
  measurementId: "Your Firebase Measurement ID"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

