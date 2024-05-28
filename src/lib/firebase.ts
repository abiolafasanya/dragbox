import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDlioTbUEuCF2XoLcl2mGLFuxzuw8VZRwQ",
  authDomain: "habiola-43f76.firebaseapp.com",
  projectId: "habiola-43f76",
  storageBucket: "habiola-43f76.appspot.com",
  messagingSenderId: "162372773971",
  appId: "1:162372773971:web:395ce5974c952b44a6fea6",
  measurementId: "G-G0VVZRJ8Q3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export { app, auth, db, storage };
// const analytics = getAnalytics(app);
