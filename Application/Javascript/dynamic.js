$(document).ready(function(){
    
    //is user logged in?, need to add function here to check
    let logged = true;

    if(!logged) {
        $("#add-update").replaceWith('<button id="log-in-btn"> Log in </button>');
    }


    let stat = getStatus(0);
    $("#status-div").replaceWith('<p> Status: <b>' + stat + '</b></p>');

    // lot should be the ID of the button clicked on map, refer to my test example i uploaded on slack
    // which parking lot is picked
    let lot = window.location.hash.substring(1);
    
    let i;
    let upid = "upid";
    let upid2 = "";
    let updateContent = "";

    // sets up divs for updates
    // div ids are upid0 ~ upid4
    for(i = 0; i < 5; i++) {
        upid2 = upid + i;
        updateContent = updateContent + '<div class="update-cls" id="' + upid2 + '"><div><p>Name</p> <p>status</p></div><div><p>comments</p></div><div><p>score</p> <button>upvote</button> <button>downvote</button></div></div>';
    }
    $("#updates").replaceWith(updateContent);
    


    let upvotebtn = 'up-btn';
    let upvotebtn2;
    let downvotebtn = 'down-btn';
    let downvotebtn2;

    //replaces each indiviual update with information

    for(i = 0; i < 5; i++) {
        let name = getName(i);
        let status = getStatus(i);
        let comment = getComment(i);
        let score = getScore(i);
        upvotebtn2 = upvotebtn + i;
        downvotebtn2 = downvotebtn + i;
        $("#" + upid + i).replaceWith('<div><p>' + name + '</p> <p>' + status + '</p></div><div><p>' + comment + '</p></div><div><p>' + score +' </p> <button id="' + upvotebtn2 + '">upvote</button> <button id"' + downvotebtn2 + '">downvote</button></div></div>');
    }


    function getName(i) {
        //some method to get name
        return 'name' + i;
    }

    function getStatus(i) {
        //some method to get status
        return 'status' + i;
    }

    function getComment(i) {
        //some method to get comment
        return 'comment' + i;
    }

    function getScore(i) {
        //some method to get score
        return 5 + i;
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