import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAomx176MK-SOrRurWejLLKntAPgNIlc9U",
    authDomain: "hackaton-e3768.firebaseapp.com",
    databaseURL: "https://hackaton-e3768.firebaseio.com",
    projectId: "hackaton-e3768",
    storageBucket: "hackaton-e3768.appspot.com",
    messagingSenderId: "873141421800"
  };
  firebase.initializeApp(config);

  export default firebase;