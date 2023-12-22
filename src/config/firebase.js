// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH1_06AwV9VmlUl2wuEnn4HQzW0WLQYOw",
  authDomain: "movie-selector-d9e87.firebaseapp.com",
  projectId: "movie-selector-d9e87",
  storageBucket: "movie-selector-d9e87.appspot.com",
  messagingSenderId: "578826737448",
  appId: "1:578826737448:web:166ad6093f46dbd231e21d",
  measurementId: "G-61HNCPTPDF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvide = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
