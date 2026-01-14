import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDUsVBs6OAkpqJxS1wY5y3yFn-niTlg120",
  authDomain: "lazni-kyiv.firebaseapp.com",
  databaseURL: "https://lazni-kyiv-default-rtdb.firebaseio.com",
  projectId: "lazni-kyiv",
  storageBucket: "lazni-kyiv.appspot.com",
  messagingSenderId: "671600154372",
  appId: "1:671600154372:web:71709d9d33f2b9f6486251",
  measurementId: "G-KLFZ6YYD2F"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };