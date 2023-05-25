
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD6S0NTeuM0TjK8Yre-B3puxyc-xiKpMjg",
    authDomain: "chat-36a94.firebaseapp.com",
    projectId: "chat-36a94",
    storageBucket: "chat-36a94.appspot.com",
    messagingSenderId: "39796565557",
    appId: "1:39796565557:web:747d4ae89d99a5acfbb37c"
};


export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage = getStorage();
export const db = getFirestore()