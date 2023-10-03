// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk_w2FxC_F-vBUn4vdLQuF_lQntT_A76k",
  authDomain: "stamina-2e22e.firebaseapp.com",
  projectId: "stamina-2e22e",
  storageBucket: "stamina-2e22e.appspot.com",
  messagingSenderId: "170586544835",
  appId: "1:170586544835:web:8cdd166e8f321471ef6076",
  measurementId: "G-43T21NFE75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);