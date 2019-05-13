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

document.getElementById('create_acc_form').addEventListener('submit', submitForm);

function submitForm(e){
    console.log("abcshirt");
    e.preventDefault();

    //Get values
    let email = document.getElementById("create_acc_email").value;
    let password = document.getElementById("create_acc_password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let firstname = document.getElementById("create_acc_firstname").value;
    let lastname = document.getElementById("create_acc_lastname").value;
    let type = document.getElementById("create_acc_type").value;

    if (password == confirmpassword) {

        //Save account
        auth.createUserWithEmailAndPassword(email, password)
            .then(firebaseuser => {

                alert("Success! You will be directed to the home page.");
                console.log(auth.currentUser.uid);
                saveAccInfo(email, password, firstname, lastname, type);
                setTimeout(window.location.href = "../index.html");

            })
            .catch(error => {
            
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.Code);

            if (errorCode == 'auth/weak-password') {
                alert("Please enter a longer password.");
            }  else if (errorCode == 'auth/email-already-in-use') {
                alert("Email is already taken. Please enter a different email.")
            } else {
                alert(errorMessage);
            }
            
        });


    } else {
        alert("Please check your password.");
    }

}

//Inserts user information into the database
function saveAccInfo(email, password, firstname, lastname, type) {

    let root = firebase.database();

    root.ref('useraccount').push({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    });

}

