// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQCVySmh0Z8uUGYAQcc_lBXGE4vlpxKoQ",
  authDomain: "hoarder-recorder.firebaseapp.com",
  projectId: "hoarder-recorder",
  storageBucket: "hoarder-recorder.appspot.com",
  messagingSenderId: "51062678992",
  appId: "1:51062678992:web:588e95c020bf058c8585d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)