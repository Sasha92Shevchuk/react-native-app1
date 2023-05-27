// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZBM8nfDj3tWJWbzf7MwlxgA34OLxlg8M",
  authDomain: "react-native-app-64a49.firebaseapp.com",
  projectId: "react-native-app-64a49",
  storageBucket: "react-native-app-64a49.appspot.com",
  messagingSenderId: "619498193953",
  appId: "1:619498193953:web:1df79591bc0810c0a00f60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("app:", app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

//"firebase": "^9.6.11",був раніше встановлений
