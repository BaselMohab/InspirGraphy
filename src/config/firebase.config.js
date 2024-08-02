import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAuV1izCjgO3u6D763yOU1VDgrEwLqUDF4",
    authDomain: "photography-blogs.firebaseapp.com",
    projectId: "photography-blogs",
    storageBucket: "photography-blogs.appspot.com",
    messagingSenderId: "188666209852",
    appId: "1:188666209852:web:a9feae7c50caa840b7c539",
    measurementId: "G-Q1VK51K2XJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider()

