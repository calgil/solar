import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: move this to .env file
const firebaseConfig = {
  apiKey: "AIzaSyBAnqVitBWBGpRMzPElyn8gzxrP9mz8H00",
  authDomain: "solar-d57fe.firebaseapp.com",
  projectId: "solar-d57fe",
  storageBucket: "solar-d57fe.appspot.com",
  messagingSenderId: "232830881272",
  appId: "1:232830881272:web:d25f672651ded38fc75a0d",
  measurementId: "G-CWWW78JD3Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
