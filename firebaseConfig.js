 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
 
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnzHm1XWvscrQxMHbXrVUf6hMT-YGjBsA",
  authDomain: "the-dev-sphere-4266c.firebaseapp.com",
  databaseURL: "https://the-dev-sphere-4266c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-dev-sphere-4266c",
  storageBucket: "the-dev-sphere-4266c.firebasestorage.app",
  messagingSenderId: "96878219547",
  appId: "1:96878219547:web:dd9e0da8476680b5d483be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
export const realTimeDataBase = getDatabase(app)
export const storage = getStorage(app);

export const imgDB = storage;

export const db = getFirestore();
 

export const auth = getAuth(app);

const initializeAuth = async () => {
  await setPersistence(auth, browserLocalPersistence);
};
// export const messaging = getMessaging(app)
// export const generateToken = async () =>{
//   const permission = await Notification.requestPermission();
//   console.log(permission)
//  if(permission === "granted")
//   {
//     const token = await getToken(messaging, {
//       vapidKey: "BLgPbm1Fo8Pav5slySA-WEWK5i7U6DVvBORAwwOzq_7qMbkoNpqxXJsbQao0TIGJmjYjRMbyo_HSETaSOMPsPXY"
//     })
//     console.log(token)
//   }


// }



initializeAuth()
  .then(() => {
    ("Firebase authentication initialized with browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Error initializing Firebase authentication:", error);
  });

export const provider = new GoogleAuthProvider();

 