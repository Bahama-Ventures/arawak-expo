import firebase from "firebase/compat/app";
import "firebase/app";
import "firebase/compat/firestore";
//import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDQq4WImXbpcNl01h2Gn03JTtPJCUMiGY0",
    authDomain: "arawak-app-1530138491672.firebaseapp.com",
    projectId: "arawak-app-1530138491672",
    storageBucket: "arawak-app-1530138491672.appspot.com",
    messagingSenderId: "154484205781",
    appId: "1:154484205781:web:f96aa6fc0189bf4eedda5c",
    measurementId: "G-N4YGW182XK"
  };


firebase.initializeApp(firebaseConfig);
//const auth = getAuth();
//const db = getFirestore(app);

export { firebase };