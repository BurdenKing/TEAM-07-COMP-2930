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

//when submit is clicked
document.getElementById('loginsubmit').addEventListener('click', e => {
   
    e.preventDefault();

    const database = firebase.database();
    const username = document.getElementById("sign_in_username").value;
    database.ref('useraccount').once('value').then(snapshot => {

        let data = snapshot.val();
        let keys = Object.keys(data);
        let usernameIsValid = false;
        let counter = 0;

        for (let i = 0; i < keys.length; i++) {

            let k = keys[i];
            let usernamequery = data[k].username;

            if (username == usernamequery) {
                counter = k;
                usernameIsValid = true;
            }
        }

        if (!usernameIsValid) {
            alert("Please check your username.");
        } else {

            const pass = document.getElementById("sign_in_password").value;
            const auth = firebase.auth();

            //Sign in
            const promise = auth.signInWithEmailAndPassword(data[counter].email, pass);

            promise.then(() => {
                alert("Success!");
                setTimeout(window.location.href = "../index.html");
            }).catch(e => {
                console.log(e.message);
            }); 
        }

    }).catch(err => {
        console.log(err);
    });

   


   


});



