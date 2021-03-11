import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCQQx4uV9rQTwEluckwWLm6DsbbzWt8VoA",
  authDomain: "zoom-demo-c7f6f.firebaseapp.com",
  projectId: "zoom-demo-c7f6f",
  storageBucket: "zoom-demo-c7f6f.appspot.com",
  messagingSenderId: "317824783999",
  appId: "1:317824783999:web:3d699ef0abea7002b4514a",
});

export default app;
