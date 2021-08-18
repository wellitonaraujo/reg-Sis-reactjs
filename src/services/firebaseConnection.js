import firebase from 'firebase/app';
import'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBsmMds5n_3O2T5ysKsH_WEnPhV0_R8CD8",
    authDomain: "sistema-cadastro-wa.firebaseapp.com",
    projectId: "sistema-cadastro-wa",
    storageBucket: "sistema-cadastro-wa.appspot.com",
    messagingSenderId: "850220705696",
    appId: "1:850220705696:web:c6381f5b9310f3ac85a6c5",
    measurementId: "G-X56SWE126P"
  };
  
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
