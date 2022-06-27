import firebase from 'firebase/app';

import {getDatabase} from "firebase/database";

import 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyBdLQdCrEQi-3cO4KdVNQcJlnAKQY9xXEU",

  authDomain: "fir-auth-7e267.firebaseapp.com",

  databaseURL: "https://fir-auth-7e267-default-rtdb.firebaseio.com",

  projectId: "fir-auth-7e267",

  storageBucket: "fir-auth-7e267.appspot.com",

  messagingSenderId: "1021894588147",

  appId: "1:1021894588147:web:9bf43cae8e82c20f7ce986"

};

  let app;
  if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }
  const auth =firebase.auth();

  export const db = firebase.database();

  export {auth};