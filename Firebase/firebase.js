import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBh6FiBvQ0rJWr5pDyRDUL0yeMEGtdxsFM",
    authDomain: "music-radio-app-60391.firebaseapp.com",
    projectId: "music-radio-app-60391",
    storageBucket: "music-radio-app-60391.appspot.com",
    messagingSenderId: "390308675984",
    appId: "1:390308675984:web:1a0059708683899a53b315",
    measurementId: "G-QPF53381KR"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase}
