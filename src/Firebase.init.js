// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFLbIe3RviiU2qF4KfM1loi3067X37KAM",
  authDomain: "paint-basic.firebaseapp.com",
  projectId: "paint-basic",
  storageBucket: "paint-basic.appspot.com",
  messagingSenderId: "106812945589",
  appId: "1:106812945589:web:2305a389130483555afafc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export default auth;