import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

function firebaseConfig() {
  return {
    apiKey: "AIzaSyApVj8YgQWb72bCpGdxL4oteaIdQTdaiS8",
    authDomain: "fir-services-205d1.firebaseapp.com",
    databaseURL: "https://fir-services-205d1.firebaseio.com",
    projectId: "fir-services-205d1",
    storageBucket: "fir-services-205d1.appspot.com",
    messagingSenderId: "889168483136",
    appId: "1:889168483136:web:92c5f9e6d6037a12e0e0a5",
    measurementId: "G-0LWSK6MJ1L",
  };
}

firebase.initializeApp(firebaseConfig());

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
