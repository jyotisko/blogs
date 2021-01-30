import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAYJVPSytKyZ0C4Ld4U1EoEV912NHGSBR0",
  authDomain: "blog-9603a.firebaseapp.com",
  projectId: "blog-9603a",
  storageBucket: "blog-9603a.appspot.com",
  messagingSenderId: "261277740013",
  appId: "1:261277740013:web:87f86b53270f9be69ed5e4"
};


export const app = firebase.initializeApp(config);
