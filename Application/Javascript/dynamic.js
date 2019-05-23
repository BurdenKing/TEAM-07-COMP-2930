$(document).ready(function () {

  //firebase configurations to parkaway
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

  //initalizes firebase
  let root = firebase.database();
  firebase.auth().onAuthStateChanged(firebaseUser => {


    //checks if user is logged in
    //Replace update button with a login button if user is not logged in
    if (firebaseUser != null) {

    } else {
      $("#add-update").replaceWith('<button id="log-in-btn" class="log-in-btn btn btn-primary"> Sign Up </button>');
    }

    // lot should be the ID of the button clicked on map, refer to my test example i uploaded on slack
    // gets the lot id from the url after the hash
    // e.g    ..dynamicpage.html#lotA
    // will return lotA
    let lot = window.location.hash.substring(1);
    
    // String to use for title, e.g Lot A
    let lotName = "Lot " + lot.substring(3);

    //replaces titles with lot name
    $("#lotNo").text(lotName);
    $("#modal-header-title").text(lotName);

    //searches for proper lot image and dynamically appends it to html
    let lotPicture = "../Images/lot/" + lot + ".png";
    $("#lotPicture").replaceWith('<img id ="lotPicture" src="' + lotPicture + '" alt="image background">');

    // gets the status of the parking lot
    // displays it to html page
    function updateStat() {
      var ref = firebase.database().ref("parkinglot/" + lot + "/comment0");
      ref.once("value")
        .then(function (snapshot) {
          var stat = snapshot.child("status").val();

          // checks if there is a status
          if (stat != null) {
            $("#status-div").replaceWith(extraStuff(stat));
          } else {
            $("#status-div").replaceWith('<p> Status: <b> Not Availiable </b><p>');

          }
        });
    }


    // appends divs to the html page
    // these divs will hold update messages
    let i;
    let upid = "upid";
    let upid2 = "";
    let updateContent = "";

    // div ids are upid0 ~ upid2
    for (i = 0; i < 3; i++) {
      upid2 = upid + i;
      updateContent = updateContent + '<div class="update-cls" id="' + upid2 + '"><div><p><b>Name</b></p> <p>status</p></div><div><p>comments</p></div><div><p>timestamp</p> </div></div>';
    }
    $("#updates").replaceWith(updateContent);
    
    refresh();

    //replaces each indiviual update with information   
    function refresh() {
      let j = 0;
      for (i = 0; i < 3; i++) {

        //grabs the comment information it needs
        var ref = firebase.database().ref("parkinglot/" + lot + "/comment" + i);

        //initalizes comment values
        ref.once("value")
          .then(function (snapshot) {
            let comment = snapshot.child("message").val();
            let status = snapshot.child("status").val();
            let timestamp = snapshot.child("timestamp").val();
            let name = snapshot.child("username").val().bold();
            let s;
            console.log(status);

            // checks status, and appeneds different html with different colors depending on value
            if (status < 1) {
              s = '<p> Status: </p> <p style="color:#00bc45"> EMPTY </p>';
            } else if (status < 26) {
              s = '<p> Status: </p> <p style="color:#04f7a5"> MOSTLY EMPTY </p>';
            } else if (status < 51) {
              s = '<p> Status: </p> <p style="color:#BBBB2B"> SOMEWHAT FULL </p>';
            } else if (status < 99) {
              s = '<p> Status: </p> <p style="color:#ffa500"> MOSTLY FULL </p>';
            } else {
              s = '<p> Status: </p> <p style="color:#ff2100"> FULL </p>';
            }

            /*

            Dynamically create id names for the comment information, used for css
            content is then added to the HTML page

            */
            
            // ids
            let divName = 'divName';
            let divCom = 'divCom';
            let divTime = 'divTime';

            let pName = 'pName';
            let pCom = 'pCom';
            let pTime = 'pTime';

            let tex = '<div id="' + upid + j + '">'
              //upid 0 ~ 2
              +
              '<div id="' + divName + j + '"><p id="' + pName + j + '"> Name: ' + name + '</p>' + s + '</div>' +
              '<div id="' + divCom + j + '"><p id="' + pCom + j + '">Comments: ' + comment + '</p></div>' +
              '<div id="' + divTime + j + '"><p id="' + pTime + j + '">' + timestamp + '</p> </div>' +
              '</div>';

            if (comment != null)
              $('#upid' + j++).replaceWith(tex);
          });

      }
      //calls here to avoid conflict
      updateStat();
    }

    //default value
    let statusVal = 'SOMEWHATFULL';
    //default value of update status
    let sta = 50;


    //button takes to login page
    $("body").on('click', '.log-in-btn', function () {
      window.location.href = "./login-signup.html";
    });

    
    //  updates database with new comments
    $("#updt-btn").click(function () {
      //comment values
      let com = document.getElementById("txt-area").value;
      let userId = firebase.auth().currentUser.uid;
      let fName;
      let lName;
      let time = (Date(Date.now())).toString();
      
      //gets snapshot of database
      root.ref('useraccount').once('value').then(snapshot => {
        let data = snapshot.val();
        let keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          let ud = data[k].uid;

          //compare current user UID to databse UID
          if (ud == userId) {
            fName = data[k].firstname;
            lName = data[k].lastname;

            //get current update count, and increases it by one
            var ref = firebase.database().ref("useraccount/" + keys[i]);
            ref.once("value")
              .then(function (snapshot) {

                let updateAmt = snapshot.child("updates").val();
                let newAmt = updateAmt + 1;
                let updatePt = snapshot.child("points").val();
                let newPt = updatePt + 1;

                firebase.database().ref('useraccount/' + keys[i] + '/updates').set(
                  newAmt
                );

                firebase.database().ref('useraccount/' + keys[i] + '/points').set(
                  newPt
                );
              });




            //updates message. comment1 copied to commet2, comment0 copied to comment1, comment0 updated
            updateRest(fName + ' ' + lName, com, sta, time, 2);
          }
        }
      });
    });




    //takes comment'o', and puts it into comment'o'+1
    function updateRest(a, b, c, d, o) {

      //checks if above comment is not 0
      if (o > 0) {
        var ref = firebase.database().ref("parkinglot/" + lot + "/comment" + (o - 1));
        ref.once("value")
          .then(function (snapshot) {
            let msg0 = snapshot.child("message").val();
            let status0 = snapshot.child("status").val();
            let timestamp0 = snapshot.child("timestamp").val();
            let username0 = snapshot.child("username").val();

            //1st time: comment1 to comment 2, then comment 0 to comment1
            writeUserData(username0, msg0, status0, timestamp0, o);
            if (o > 1) {
              //comment1 copied to 2
              updateRest(a, b, c, d, 1);
            } else {
              //comment0 copied to 1
              updateRest(a, b, c, d, 0);
            }
          });

        //updates comment0
      } else {
        writeUserData(a, b, c, d, 0);
      }

    }

    //writes data into comment + l
    //paramenters: name, comment, status, timestamp, comment index
    function writeUserData(n, co, st, t, l) {

      //writes indiviual comment, param 'l' is which comment to write to
      firebase.database().ref('parkinglot/' + lot + '/comment' + l).set({
        message: co,
        status: st,
        timestamp: t,
        username: n
      });

      //runs only once, updates parking lot status "full"
      if (l == 0) {
        firebase.database().ref('parkinglot/' + lot + '/full').set(
          st
        );
        location.reload();
      }
    }

    //default color
    $("#color").css("color", "#042cf7");

    var values = ['EMPTY'];
    for (var x = 0; x < 33; x++) {
      values.push('MOSTLY EMPTY');
    }
    for (var J = 0; J < 33; J++) {
      values.push('SOMEWHAT FULL');
    }

    for (var K = 0; K < 33; K++) {
      values.push('MOSTLY FULL');
    }

    values.push('FULL');
    console.log(values);

    /*
      Gets slider value from update new comment
      changes text color and text content depending on value

    */
    $('#slider1').change(function () {
      $('.colorIndicator').text(values[this.value]);
      statusVal = values[this.value];
      switch (values[this.value]) {
        case 'EMPTY':
          $("#color").css("color", "#00bc45");
          sta = 0
          break;
        case 'MOSTLY EMPTY':
          $("#color").css("color", "#04f7a5");
          sta = 25
          break;
        case 'SOMEWHAT FULL':
          $("#color").css("color", "#BBBB2B");
          sta = 50
          break;
        case 'MOSTLY FULL':
          $("#color").css("color", "#ffa500");
          sta = 75
          break;
        case 'FULL':
          $("#color").css("color", "#ff2100");
          sta = 100;
          break;
        default:
          $("#color").css("color", "#000000");
      }
      console.log(sta);
    });

    /*
      extrastuff(q)
      q is the status value
      returns an HTML string, with proper styling and text content
    */
    function extraStuff(q) {
      if (q < 1) {
        return '<p id="status-div"> Status: <b style="color:#00bc45"> EMPTY </b> </p>';
      } else if (q < 26) {
        return '<p id="status-div"> Status: <b style="color:#04f7a5"> MOSTLY EMPTY </b> </p>';
      } else if (q < 51) {
        return '<p id="status-div"> Status: <b style="color:#BBBB2B"> SOMEWHATFULL </b> </p>';
      } else if (q < 76) {
        return '<p id="status-div"> Status: <b style="color:#ffa500"> MOSTLY FULL </b> </p>';
      } else {
        return '<p id="status-div"> Status: <b style="color:#ff2100"> FULL </b> </p>';
      }
    }
  });


    //Header Script is included here because I can't add two firebase configs in one html page
    firebase.auth().onAuthStateChanged(firebaseUser => {
      //console.log(firebaseUser);
      //console.log(firebaseUser.uid);
      //If firebaseuser info exists, then show personalized message and log out button.
      if (firebaseUser != null) {
  
          let useremail = firebase.auth().currentUser.email;

          $(".rightNav").empty();
          $("#slider_user_widget").empty();

          let loggedinwidget = "<div class='logged-in-widget'>"
          + "<div class='acc_name' id='acc_name_desktop'></div>"
          + "<div><button class='sign_out_button btn btn-primary btn-lg myButton' type='submit'>"
          + "Sign Out</button>"
          + "</div></div>";

          let loggedinwidgetmobile = "<div class='logged-in-widget'>"
          + "<div class='acc_name' id='acc_name_mobile'></div>"
          + "<div><button id='slider_sign_out_button' class='sign_out_button btn btn-primary btn-lg myButton' type='submit'>"
          + "Sign Out</button>"
          + "</div></div>";
                      
          function toSignOut() {     
              firebase.auth().signOut().then(() => {
                  alert("You are now signed out from ParkAway.");
                  // Sign-out successful.
              }, function(error) {
                  console.log(error);
              });
          }
          
          $(".rightNav").append(loggedinwidget);
          $("#slider_user_widget").append(loggedinwidgetmobile);

          $('.sign_out_button').on('click', toSignOut);
          
          root.ref('useraccount').on('value', snapshot => {
  
              let data = snapshot.val();
              let keys = Object.keys(data);
  
              for (let i = 0; i < keys.length; i++) {

                  let k = keys[i];
                  let dataemail = data[k].email;
  
                  if (useremail == dataemail) {
                      $(".acc_name").empty();
                      //Greet full name of the user.
                      $(".acc_name").append("<a id='acc_name_text' href='./userAccount.html'>Welcome <b>" + data[k].firstname + "</b></a>");
                  }
              }
          
          });

      //If firebaseuser info doesn't exist, then show sign in and sign up button. 
    } else {

      $(".rightNav").empty();
      $("#slider_user_widget").empty();

      let loggedoutwidget = "<button class='sign_in_button btn btn-primary btn-lg myButton myButton_desktop'" +
        "type='submit'>Sign In</button>" +
        "<div id='signUpBox'><h3><a class='signUp' href='./login-signup.html'>Or Sign Up</a></h3></div>";

      let loggedoutwidgetmobile = "<button class='sign_in_button btn btn-primary btn-lg myButton slider_widget_button'" +
        "type='submit'>Sign In</button>" +
        "<div id='signUpBox'><h3><a class='signUp' id='slider_widget_text' href='./login-signup.html'>Or Sign Up</a></h3></div>";

      function toSignIn() {
        window.location.href = './login-signup.html';
      }

      $(".rightNav").append(loggedoutwidget);
      $("#slider_user_widget").append(loggedoutwidgetmobile);

      $(".sign_in_button").on('click', toSignIn);

    }

  });

  //Slider Media Query Changes
  let tab = true;

  $(".mediaIcon").on("click", () => {
    if (tab) {
      $(".slider").animate({
        width: 'toggle',
        paddingLeft: 'toggle',
        paddingRight: 'toggle'
      }, 500);
      $(".slider").css({
        "display": "block"
      });
      $(".mediaIcon").attr("src", "../Images/cancel.png");
      tab = false;
    } else {
      $(".slider").css({
        "display": "none"
      });
      $(".mediaIcon").attr("src", "../Images/menu_icon.png");
      tab = true;
    }
  });

  $(window).resize(function () {
    if ($(window).width() >= 1550) {
      $(".slider").css({
        "display": "none"
      });
    }
  });


});