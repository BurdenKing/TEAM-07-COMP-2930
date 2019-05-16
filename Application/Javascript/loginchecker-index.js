//Checks if user is logged in. JQuery is required. This script is only for index.html
$(document).ready(function() {

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
    
    let root = firebase.database();

    firebase.auth().onAuthStateChanged(firebaseUser => {
        //console.log(firebaseUser);
        //console.log(firebaseUser.uid);
        //If firebaseuser info exists, then show personalized message and log out button.
        if (firebaseUser != null) {
    
            let useremail = firebase.auth().currentUser.email;

            $(".rightNav").empty();
            let loggedinwidget = "<div id='logged-in-widget'>"
            + "<div id='acc_name'></div>"
            + "<div><button id='sign_out_button' class='btn btn-primary btn-lg myButton' type='submit'>"
            + "Sign Out</button>"
            + "</div></div>";
                        
            function toSignOut() {     
                firebase.auth().signOut().then(() => {
                    alert("You are now signed out from ParkAway.");
                    // Sign-out successful.
                }, function(error) {
                    console.log(error);
                });
            }

            $(".rightNav").append(loggedinwidget);
            document.getElementById('sign_out_button').addEventListener('click', toSignOut);
    
            
            root.ref('useraccount').on('value', snapshot => {
    
                let data = snapshot.val();
                let keys = Object.keys(data);
    
                for (let i = 0; i < keys.length; i++) {

                    let k = keys[i];
                    let dataemail = data[k].email;
    
                    if (useremail == dataemail) {
                        $("#acc_name").empty();
                        //Greet full name of the user.
                        $("#acc_name").append("Welcome <b>" + data[k].firstname + " " + data[k].lastname + "</b>");
                    }
                }
            
            });


        //If firebaseuser info doesn't exist, then show sign in and sign up button. 
        } else {
            
            $(".rightNav").empty();
            let loggedoutwidget = "<button id='sign_in_button' class='btn btn-primary btn-lg myButton'"
            + "type='submit'>Sign In</button>"
            + "<div id='signUpBox'><h3><a class='signUp' href='./HTML/signUp.html'>Or Sign Up</a></h3></div>";

            function toSignIn() {
                window.location.href = './HTML/login.html';
            }

            $(".rightNav").append(loggedoutwidget);
            document.getElementById('sign_in_button').addEventListener('click', toSignIn);

        }
    
    });
});

