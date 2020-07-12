import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAkTRLiWbGuWUHn8vHqcMGTpwEjniy-mOs",
  authDomain: "therunup-e8116.firebaseapp.com",
  databaseURL: "https://therunup-e8116.firebaseio.com",
  projectId: "therunup-e8116",
  storageBucket: "therunup-e8116.appspot.com",
  messagingSenderId: "775827416768",
  appId: "1:775827416768:web:4ae5afa207fe483970ef25",
  measurementId: "G-VV5NRD9737",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
