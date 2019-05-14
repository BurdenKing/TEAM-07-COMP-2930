//Checks if user is logged in


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

    console.log(firebaseUser);

    if(firebaseUser != null) {

        console.log("Signed in!");
        let userId = firebase.auth().currentUser.uid;
        
        /*
        firebase.auth().signOut().then(() => {
            console.log("Success!");
            // Sign-out successful.
        }, function(error) {
            console.log(error)
        });
        */
        

        /*
        root.ref('useraccount').on('value', snapshot => {

            let data = snapshot.val();
            let keys = Object.keys(data);
            let currentUser = auth.getCurrentUser().

            if (currentUser != null) {

                for (let i = 0; i < keys.length; i++) {

                    let k = keys[i];
                    let usernamequery = data[k].username;
    
                    if (username == usernamequery) {
                        counter = k;
                        usernameIsValid = true;
                    }
                }
            } else {

            }

        );
        */
    } else  {
        console.log("Logged out!");
        document.getElementById("readtest").innerHTML = "<h1>Hi! IT WORKS</h1>";
    }

});