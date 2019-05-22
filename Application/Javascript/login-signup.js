/* Switches bteween login and sign up*/
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const createAccLinkMobile = document.getElementById('create_acc_link_mobile');
const container = document.getElementById('container');

/* Animation that makes right panel active */
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

/* Animation that makes left panel active */
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

/*Displays a registration form on mobile */
createAccLinkMobile.addEventListener('click', () => {
    document.getElementById('sign_in_container_mobile').style.display = 'none';
    document.getElementById('sign_up_container_mobile').style.display = 'block';
});


/* ----- Firebase-Related Scripts ------ */ 

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

/* ----- SIGN-UP-RELATED JAVASCRIPT ----- */

//When submit is clicked on desktop version.
document.getElementById("create_acc_submit_desktop").addEventListener('click', e => {

    e.preventDefault();

    //Get values
    let username = document.getElementById("create_acc_username_desktop").value;
    let email = document.getElementById("create_acc_email_desktop").value;
    let password = document.getElementById("create_acc_password_desktop").value;
    let confirmpassword = document.getElementById("confirmpassword_desktop").value;
    let firstname = document.getElementById("create_acc_firstname_desktop").value;
    let lastname = document.getElementById("create_acc_lastname_desktop").value;
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

//When submit is clicked on mobile version.
document.getElementById("create_acc_submit_mobile").addEventListener('click', e => {

    e.preventDefault();

    //Get values
    let username = document.getElementById("create_acc_username_mobile").value;
    let email = document.getElementById("create_acc_email_mobile").value;
    let password = document.getElementById("create_acc_password_mobile").value;
    let confirmpassword = document.getElementById("confirmpassword_mobile").value;
    let firstname = document.getElementById("create_acc_firstname_mobile").value;
    let lastname = document.getElementById("create_acc_lastname_mobile").value;
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

    let fmtfirstname = firstname.substring(0,1).toUpperCase() 
        + firstname.substring(1).toLowerCase();
    let fmtlastname = lastname.substring(0,1).toUpperCase() 
        + lastname.substring(1).toLowerCase();

    root.ref('useraccount').push({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
        firstname: fmtfirstname,
        lastname: fmtlastname,
        uid: uid,
        updates: 0,
        points: 0
    });

}


/* ----- LOGIN-RELATED JAVASCRIPT ----- */

//when submit is clicked on desktop version
document.getElementById('loginsubmit_desktop').addEventListener('click', e => {
   
    e.preventDefault();

    const database = firebase.database();
    const username = document.getElementById("sign_in_username_desktop").value;
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

            const pass = document.getElementById("sign_in_password_desktop").value;
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

//when submit is clicked on mobile version
document.getElementById('loginsubmit_mobile').addEventListener('click', e => {
   
    e.preventDefault();

    const database = firebase.database();
    const username = document.getElementById("sign_in_username_mobile").value;
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

            const pass = document.getElementById("sign_in_password_mobile").value;
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



