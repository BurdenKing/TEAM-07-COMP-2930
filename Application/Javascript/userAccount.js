$(document).ready(function() {

    //incase user gets here without logging in
    let logged = false;
    
    //if user alreayd logged in, replace html with this
    if(logged) {
        $("#account-main-body").replaceWith( "<p>You must log in first</p> <button type ='button' id='return_log'> Log in </button>");
    }

    //gonna have to connect to database to get these
    let name = "James Duke";
    let reports = "5";
    let upvotes = "6";
    let downvotes = "2";
    let points = "100";
    ///////////////server and databse ^^^^////////////////////

    $("#user-name").replaceWith(name);
    $("#user-reports").replaceWith(reports);
    $("#user-upvotes").replaceWith(upvotes);
    $("#user-downvotes").replaceWith(downvotes);
    $("#user-points").replaceWith(points);






    //button takes to log in page
    $("#return_home").click(function() {
        window.location.href = "./login.html";
    }); 
    
    $("#btn-change-password").click(function() {
        $("#changePass").css("display", "block");
    });

    $("#closeForm").click(function() {
        $("#changePass").css("display", "none");
    });

    
    $("#changebtn").submit(function(e) {
        e.preventDefault();
        console.log('got here');    
    });
   
    $("#btn-redeem").click(function(){
        let radioValue = $("input[name='radioBtn']:checked").val()

        switch(radioValue) {
            case "reward1":
              // do something when user redeems reward 1
              break;
            case "reward2":
              // re2
              break;
             case "reward3":
            // re3
              break;
            default:
              // shouldn't arrive here, but if
              // indicate error
          } 
    });

});