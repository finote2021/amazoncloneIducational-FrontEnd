// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm20ppgcz2sj8QjV8EHlIzcmT-3VbF8Qw",
  authDomain: "clone-ed7ef.firebaseapp.com",
  projectId: "clone-ed7ef",
  storageBucket: "clone-ed7ef.appspot.com",
  messagingSenderId: "421225915199",
  appId: "1:421225915199:web:0ff8aa2d8ee70c9696e98a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAm20ppgcz2sj8QjV8EHlIzcmT-3VbF8Qw",
//   authDomain: "clone-ed7ef.firebaseapp.com",
//   projectId: "clone-ed7ef",
//   storageBucket: "clone-ed7ef.appspot.com",
//   messagingSenderId: "421225915199",
//   appId: "1:421225915199:web:0ff8aa2d8ee70c9696e98a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// //optinal firebase configration

// Import the functions you need from the SDKs you need

// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBZc9cMte6ckPEuyd2aa95wJjgfcll5y4o",
//   authDomain: "clone-559ec.firebaseapp.com",
//   projectId: "clone-559ec",
//   storageBucket: "clone-559ec.appspot.com",
//   messagingSenderId: "1073767124810",
//   appId: "1:1073767124810:web:0d152cce62ce7f136c3bb3",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = firebase.firestore();

// // Initialize Auth
// const auth = firebase.auth();

// export { db, auth };
