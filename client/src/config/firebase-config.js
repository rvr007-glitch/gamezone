import firebase from "firebase/app"

import { analytics } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMMIRf3hSauvEsoFYkmVVEPzFoPF3wdSs",
  authDomain: "unogame-31d6d.firebaseapp.com",
  projectId: "unogame-31d6d",
  storageBucket: "unogame-31d6d.appspot.com",
  messagingSenderId: "195684323659",
  appId: "1:195684323659:web:4af557e251769e9a6058ce",
  measurementId: "G-46EWQS0JYV"
};

// Initialize Firebase
 const app=firebase.initializeApp(firebaseConfig);

export default app;