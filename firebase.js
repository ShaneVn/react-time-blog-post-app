import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_qqVMhOS4dqAdgDyWLSD6IvSIrSOwqw0",
  authDomain: "twitter-clone-f6283.firebaseapp.com",
  projectId: "twitter-clone-f6283",
  storageBucket: "twitter-clone-f6283.appspot.com",
  messagingSenderId: "632662873473",
  appId: "1:632662873473:web:3db953a4cfee2549b68480",
  measurementId: "G-06FSZ91Z80",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
