import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- 1. Importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA59m0YuKXEAVaPYqCcDaRccs9BhxmmdU0",
  authDomain: "coder-ecommerce-65326.firebaseapp.com",
  projectId: "coder-ecommerce-65326",
  storageBucket: "coder-ecommerce-65326.firebasestorage.app",
  messagingSenderId: "217030976670",
  appId: "1:217030976670:web:5b07c8ea585bbbf605878f",
  measurementId: "G-MLPL0LE04G"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (Base de datos)
const db = getFirestore(app);

export { db };