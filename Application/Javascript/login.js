$(document).ready(function() {

    //Gonna have to check server for this
    let profile = true;
    
    //if user already has profile, redirect to index
    if(logged) {
        window.location.href = "../index.html";
    }

    //when submit clicked
    $("#submit").submit(function(e) {
    e.preventDefault();
    console.log('got here');
    let updates = 0;
    let upvotes = 0;
    let downvotes = 0;
    
   // let var_user = document.getElementById('userName').value;
   // let var_pass = document.getElementById('password').value;
    
    

});

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