$(document).ready(function(){

    //check if user is logged, create function for this
    let logged = true;
    
    let replaceIfLogged = "<p>You're already logged in</p> <button type='button' id='return_main'>Return to Home Page</button>";
    
    if(!logged) {
        $("#form-div").replaceWith(replaceIfLogged);
    }

    //button takes to main page
    $("#return_main").click(function() {
        window.location.href = "../index.html";
    }); 

});