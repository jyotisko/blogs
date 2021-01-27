import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "xxxx",
  authDomain: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxxx"
};

export const app = firebase.initializeApp(config);
