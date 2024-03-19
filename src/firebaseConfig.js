// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ5e5Y6yGR0iFMBlCa1fSKa5FZjSKcORw",
  authDomain: "hoarderrecorder.firebaseapp.com",
  projectId:"hoarderrecorder",
  storageBucket:"hoarderrecorder.appspot.com",
  messagingSenderId:"590281804630",
  appId:"1:590281804630:web:d4bc5a72ce6a6f9a7224f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const db = getFirestore(app)