var firebase = require("firebase");
// Your firebase config here
firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "-",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

module.exports = firebase.initializeApp(firebaseConfig);