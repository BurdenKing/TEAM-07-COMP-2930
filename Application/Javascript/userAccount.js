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

    if(firebaseUser != null) {
      
    } else {
        $("#account-main-body").replaceWith( "<p>You must log in first</p> <button type ='button' id='return_log'> Log in </button>");
    }

    
    let userId = firebase.auth().currentUser.uid;
  
    root.ref('useraccount').once('value').then(snapshot => {        
      let data = snapshot.val();
      let keys = Object.keys(data);
             
      for (let i = 0; i < keys.length; i++) {            
          let k = keys[i];
          let ud = data[k].uid;    
          
                 
          if (ud == userId) {
            let fName = data[k].firstname;
            let lName = data[k].lastname;     
            let nam = fName + ' ' + lName;
            let reports = data[k].updates;
            let points = data[k].points;
            
            $("#user-name").replaceWith(nam);
            $("#user-reports").replaceWith(reports);
            $("#user-points").replaceWith(points);
        

          }
      }     
    });
   
   

   





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


});