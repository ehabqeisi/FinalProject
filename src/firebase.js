import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHx3WRJsiyHAESdeuwfyTZrq2t3PPeJco",
    authDomain: "ehab-e716a.firebaseapp.com",
    projectId: "ehab-e716a",
    storageBucket: "ehab-e716a.appspot.com",
    messagingSenderId: "430570613039",
    appId: "1:430570613039:web:5e809aec9bc16a2e9f59da",
    measurementId: "G-M1ZV5B159E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
