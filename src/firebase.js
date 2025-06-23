// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGwaUTDgmsHtckvERg_h4sD6On9s8c9x8",
  authDomain: "film-departmentdb.firebaseapp.com",
  databaseURL: "https://film-departmentdb-default-rtdb.firebaseio.com",
  projectId: "film-departmentdb",
  storageBucket: "film-departmentdb.firebasestorage.app",
  messagingSenderId: "429649845450",
  appId: "1:429649845450:web:e5fb8249ded459af2ce833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 
