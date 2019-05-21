
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
        $("#account-main-body").replaceWith( "<p>You must log in first</p> <button type ='button' id ='return_log' class='return_log'> Log in </button>");
    }

    $("body").on('click', '.return_log', function() {
        window.location.href = "./login-signup.html";
    }); 
    
    let userId = firebase.auth().currentUser.uid;
    let points;
    let k;
    root.ref('useraccount').once('value').then(snapshot => {        
      let data = snapshot.val();
      let keys = Object.keys(data);
             
      for (let i = 0; i < keys.length; i++) {            
          k = keys[i];
          let ud = data[k].uid;    
          
                 
          if (ud == userId) {
            let fName = data[k].firstname;
            let lName = data[k].lastname;     
            let nam = fName + ' ' + lName;
            let reports = data[k].updates;
            points = data[k].points;
            
            $("#user-name").text(nam);
            $("#user-reports").text('Updates: ' + reports);
            $("#user-points").text('Points: ' + points);
        

          }
      }     
    });
   
   

   
 




    //button takes to log in page
    
    
    $("#btn-change-password").click(function() {
        $("#changePass").css("display", "block");
    });

    $("#closeForm").click(function() {
        $("#changePass").css("display", "none");
    });

    
    $("#changebtn").click(function(e) {
        e.preventDefault();
           
        
        let OldPasswordCheck;
        let oldPass = document.getElementById("oldPas").value;
        var newPassword = document.getElementById("newPass").value;
        var confirmPassword = document.getElementById("newPass2").value;
        root.ref('useraccount').once('value').then(snapshot => {        
            let data = snapshot.val();
            let keys = Object.keys(data);
                   
            for (let i = 0; i < keys.length; i++) {            
                let k = keys[i];
                let ud = data[k].uid;    
                
                       
                if (ud == userId) {
                    OldPasswordCheck = data[k].password;   
                    
                    if (oldPass === "" || newPassword === "" || confirmPassword === "") {
                        $("#errorMsg").text("Must not be empty");
                        $("#errorMsg").css("color", "red");
                    } else if(OldPasswordCheck !== oldPass) {
                        $("#errorMsg").text("Wrong Old Password");   
                        $("#errorMsg").css("color", "red");
                    } else if(newPassword !== confirmPassword) {
                        $("#errorMsg").text("New passwords do not match");
                        $("#errorMsg").css("color", "red");
                    }  else {
                        
                        firebase.database().ref('useraccount/' + keys[i] + '/password').set(
                            newPassword
                        );

                        document.getElementById("oldPas").value = "";
                        document.getElementById("newPass").value = "";
                        document.getElementById("newPass2").value = "";

                        $("#errorMsg").text("Succesfully Changed");
                        $("#errorMsg").css("color", "green");

                    }
                    
                    
                    

                }
            }
        });
    
    });

    let rewardDec = 50;
    let itemNo = "item 1";

    $("#btn-redeem").click(function(){
        let radioValue = $("input[name='radioBtn']:checked").val()
      
        switch(radioValue) {
            case "reward1":
              rewardDec = 50;
              itemNo = "item 1";
              break;
            case "reward2":
              rewardDec = 30;
              itemNo = "item 2";
              break;
             case "reward3":
                rewardDec = 25;
                itemNo = "item 3";
              break;
            default:
              // shouldn't arrive here, but if
              // indicate error
          } 


          if (points < rewardDec) {
            $("#redeem-confirmation").replaceWith('<div id="redeem-confirmation"><p>Not enough Points</p></div>');
          } else {
            $("#redeem-confirmation").replaceWith('<div id="redeem-confirmation"> <p id="item">' + itemNo + '</p> <p id="user-pt"> Your Points: ' + points + '</p> <p id="cost-pt"> Costs: ' + rewardDec + '</p> <p id="new pt"> Your Points After: ' + (points - rewardDec) + '</p> <button type ="button" class="appendedBtn" > Confirm </button></div>');
          }

    });

    $("body").on('click', '.appendedBtn', function() {
        
        newPoint = points - rewardDec;
        console.log("newPoint");
        
        root.ref('useraccount').once('value').then(snapshot => {        
            let data = snapshot.val();
            let keys = Object.keys(data);
                   
            for (let i = 0; i < keys.length; i++) {            
                let k = keys[i];
                let ud = data[k].uid;    
                
                       
                if (ud == userId) {
                    console.log("got here");
                    firebase.database().ref('useraccount/' + keys[i] + '/points').set(
                        newPoint
                    );
                }

            }

        });

        points = newPoint;
        console.log(points);
        $("#user-points").text('Points: ' + newPoint);
      
        $("#redeem-confirmation").replaceWith('<div id="redeem-confirmation"><p>Congratulations, your new points is:' + points + '</p></div>');
    });
});


});

