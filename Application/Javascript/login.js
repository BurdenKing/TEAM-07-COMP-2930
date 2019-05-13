//Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC92FAonMbNaZiapSbs_A0RDzS0YPgpcMw",
    authDomain: "parkaway-comp2930.firebaseapp.com",
    databaseURL: "https://parkaway-comp2930.firebaseio.com",
    projectId: "parkaway-comp2930",
    storageBucket: "parkaway-comp2930.appspot.com",
    messagingSenderId: "817259487218",
    appId: "1:817259487218:web:c64c81d3cf0c5465"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//Get elements
const txtEmail = document.getElementById('sign_in_email');
const txtPassword = document.getElementById('sign_in_password');
const btnSignin = document.getElementById('submit');

btnSignin.addEventListener('click', e => {
    e.preventDefault();

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.then(e => {
        alert("Success!");
        setTimeout(window.location.href = "../index.html");
    }).catch(e => {
        console.log(e.message);
    });

});