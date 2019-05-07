$(document).ready(function() {

   

    $("#log_in_form").submit(function(e) {
    e.preventDefault();
    console.log('got here');
    let var_user = document.getElementById('userName').value;
    let var_pass = document.getElementById('password').value;
    

    if(!validateEmail(var_user)){
        $("#error").text("invalid comination");
        $("#error").css("color", "red");
        e.preventDefault(); 
    } else {
        window.location.href = "./main.html";
    }
});





function validateEmail(email) {
    let em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email);
}


$("#sign_up").click(function() {
    window.location.href = "./signUp.html";
});

});