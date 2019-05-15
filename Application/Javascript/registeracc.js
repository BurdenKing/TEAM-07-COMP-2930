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

let database = firebase.database();

//When submit is clicked.
document.getElementById("create_acc_submit").addEventListener('click', e => {

    e.preventDefault();

    //Get values
    let username = document.getElementById("create_acc_username").value;
    let email = document.getElementById("create_acc_email").value;
    let password = document.getElementById("create_acc_password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let firstname = document.getElementById("create_acc_firstname").value;
    let lastname = document.getElementById("create_acc_lastname").value;
    let usernameIsTaken = false;

    if (password == confirmpassword) {

        database.ref('useraccount').once('value').then(snapshot => {
            

            //<!-- START CODE TO VALIDATE USERNAME WITH GOOGLE FIREBASE
            let usernamedata = snapshot.val();
            let keys = Object.keys(usernamedata);
 
            for (let i = 0; i < keys.length; i++) {

                let k = keys[i];
                let usernamequery = usernamedata[k].username;

                if (username == usernamequery) {
                    usernameIsTaken = true;
                }
            }
            // END CODE TO VALIDATE USERNAME WITH GOOGLE FIREBASE -->

            if (usernameIsTaken) {
                alert("The username is taken! Please enter a different username.")
            } else {
                //If result is false, then the user can create an account
                auth.createUserWithEmailAndPassword(email, password).then(() => {

                    alert("Success! You will be directed to the home page.");
                    saveAccInfo(username, email, password, firstname, lastname);
                    setTimeout(window.location.href = "../index.html");

                }).catch(error => {
                
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode == 'auth/weak-password') {
                        alert("Please enter a longer password.");
                    }  else if (errorCode == 'auth/email-already-in-use') {
                        alert("Email is already taken. Please enter a different email.")
                    } else {
                        alert(errorMessage);
                    }
                });
            
            }
        });
    } else {
        alert("Please check your password.");
    }
});

//Inserts user information into the database
function saveAccInfo(username, email, password, firstname, lastname) {

    let root = firebase.database();
    let uid = firebase.auth().currentUser.uid;

    root.ref('useraccount').push({
        username: username,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        uid: uid
    });

}

