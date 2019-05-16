$(document).ready(function(){
    
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
        $("#add-update").replaceWith('<button id="log-in-btn"> Log in </button>');
    }

    // lot should be the ID of the button clicked on map, refer to my test example i uploaded on slack
    // which parking lot is picked
    let lot = window.location.hash.substring(1);
   
    var ref = firebase.database().ref("parkinglot/" + lot + "/comment0");
    ref.once("value")
      .then(function(snapshot) {
        var stat = snapshot.child("status").val();
        $("#status-div").replaceWith('<p> Status: <b>' + stat + '</b></p>');
      });
    

    let i;
    let upid = "upid";
    let upid2 = "";
    let updateContent = "";

    // sets up divs for updates
    // div ids are upid0 ~ upid4
    for(i = 0; i < 3; i++) {
        upid2 = upid + i;
        updateContent = updateContent + '<div class="update-cls" id="' + upid2 + '"><div><p>Name</p> <p>status</p></div><div><p>comments</p></div><div><p>timestamp</p> </div></div>';
    }
    $("#updates").replaceWith(updateContent);
    


    let upvotebtn = 'up-btn';
    let upvotebtn2;
    let downvotebtn = 'down-btn';
    let downvotebtn2;

    //replaces each indiviual update with information
   
    let j = 0;
    for(i = 0; i < 3; i++) {
        
        var ref = firebase.database().ref("parkinglot/" + lot + "/comment" + i);
        
        ref.once("value")
          .then(function(snapshot) {
            let comment = snapshot.child("message").val();
            let status = snapshot.child("status").val();
            let timestamp = snapshot.child("timestamp").val();
            let name = snapshot.child("username").val();   
            $('#upid' + j++).replaceWith('<div><p> Name: ' + name + '</p> <p> Status:' + status + '</p></div><div><p>Comments: ' + comment + '</p></div><div><p>' + timestamp + '</p> </div>');
            
          });
          
    }


    //some functions here to deal with upvote and downvote btns
    //button ids are up-btn0 ~ up-btn4
    // down-btn0 ~ down-btn4

    
    //button takes to login page
    $("#log-in-btn").click(function() {
        window.location.href = "./login.html";
    }); 
    
    /**  NEEDS TO CREATE UPDATE.HTML PAGE FIRST 
    $("#update-btn").click(function() {
        window.location.href = "./update.html" + "#" + (lot);
    });
    */

    });
});