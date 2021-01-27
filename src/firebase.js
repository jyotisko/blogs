import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "xxxx",
  authDomain: "xxx-xxx.xxx.xxx",
  projectId: "xxx-xxx",
  storageBucket: "xxx-xxx.xxx.xxx",
  messagingSenderId: "xxx",
  appId: "x:xxx:xxx:xxxx"
};

export const app = firebase.initializeApp(config);
