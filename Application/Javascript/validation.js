
/**This function validates the fields for creating an account. */

let validation = () => {
    
    let username = document.forms["accform"]["username"];               
    let password = document.forms["accform"]["password"];    
    let confirmpassword = document.forms["accform"]["confirmpassword"];  
    let firstname = document.forms["accform"]["firstname"];  
    let lastname =  document.forms["accform"]["lastname"];  
    let email = document.forms["accform"]["email"];  
    let type = document.forms["accform"]["type"];  

    if (username.value == "") {
        window.alert("Please enter your username.");
        username.focus();
        return false;
    }

    if (password.value == "") { 
        window.alert("Please enter your password."); 
        password.focus(); 
        return false; 
    } 

    if (password.value != confirmpassword.value) { 
        window.alert("Please check your password."); 
        confirmpassword.focus(); 
        return false; 
    } 

    if (firstname.value == "") { 
        window.alert("Please enter your first name."); 
        firstname.focus(); 
        return false; 
    } 

    
    if (lastname.value == "") { 
        window.alert("Please enter your last name."); 
        lastname.focus(); 
        return false; 
    } 

    if (email.value == "" || email.value.indexOf("@", 0) < 0)                                   
    { 
        window.alert("Please enter a valid e-mail address."); 
        email.focus(); 
        return false; 
    } 

    if (type.selectedIndex < 1)                  
    { 
        alert("Please select a person type."); 
        type.focus(); 
        return false; 
    } 

    return true;
}
