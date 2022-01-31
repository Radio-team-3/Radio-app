import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDypeOJAaBWX6iGGHwjK2L1-MxtTCTYS2I",
  authDomain: "radio-app-91e30.firebaseapp.com",
  projectId: "radio-app-91e30",
  storageBucket: "radio-app-91e30.appspot.com",
  messagingSenderId: "103785131934",
  appId: "1:103785131934:web:38cf6834b72b72bb48308f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
