$(document).ready(function() {

    //Gonna have to check server for this
    let logged = true;
    
    //if user alreayd logged in, replace html with this
    if(!logged) {
        $("#form_id").replaceWith( "<p>You are already logged in </p> <button type = 'button' id='return_home'> return to home page</button>");
    }


   
    //when submit clicked
    $("#log_in_form").submit(function(e) {
    e.preventDefault();
    console.log('got here');
    let var_user = document.getElementById('userName').value;
    let var_pass = document.getElementById('password').value;
    
    //
    // METHOD HERE THAT CHECKS IF EMAIL AND PASSWORD MATCHES AN ACCOUNT IN DATABASE
    //
    
    if(!validateEmail(var_user)){
        $("#error").text("invalid comination");
        $("#error").css("color", "red");
        e.preventDefault(); 
    } else {
        //check if the email exist in database
        //if it exists, check if it matches the password
        //if it matches, log the user in
        window.location.href = "./main.html";
    }
});




//checks if param is an email
function validateEmail(email) {
    let em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email);
}

//button takes to signup page
$("#sign_up").click(function() {
    window.location.href = "./signUp.html";
});

//button takes to home page
$("#return_home").click(function() {
    window.location.href = "./main.html";
});


});