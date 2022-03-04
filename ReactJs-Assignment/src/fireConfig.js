import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmePjrJVTqf1O3en-xghhwT3JoOdxXhVA",
  authDomain: "e-commerce-reactapp.firebaseapp.com",
  projectId: "e-commerce-reactapp",
  storageBucket: "e-commerce-reactapp.appspot.com",
  messagingSenderId: "907657867776",
  appId: "1:907657867776:web:e93f4993bf3a79a7dfdee5",
  measurementId: "G-GZS6K1PY7T"
};


const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB