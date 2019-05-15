$(document).ready(function(){
    
    let lot = window.location.hash.substring(1);

    $('#lot-title').replaceWith('<p>' + lot + '</p>');

    //default color
    $("#color").css("color", "#042cf7");
    
    let statusVal = 'HALF';
    var values = ['EMPTY', 'MOSTLY EMPTY', 'HALF', 'MOSTLY FULL', 'FULL'];
    $('#slider1').change(function() {
        $('span').text(values[this.value]);
        statusVal = values[this.value];
        switch (values[this.value]) {
            case 'EMPTY':
                $("#color").css("color", "#01600b");
                break;
            case 'MOSTLY EMPTY':
                $("#color").css("color", "#04f7a5");
                break;
            case 'HALF':
                $("#color").css("color", "#042cf7");
                break;
            case 'MOSTLY FULL':
                $("#color").css("color", "#faff00");
                break;
            case 'FULL':
                $("#color").css("color", "#ff2100");
                break; 
            default:
                $("#color").css("color", "#000000");
        }           
    });


    $("#confirm-updt").click(function(e) {
        e.preventDefault();
        let comment = document.getElementById("txt-area").value;
        /** some code here which takes
         * updates 'comment' and 'statusVal' to database
         * as well as the user name
         *  closes popup form and refreshes the page
         */

        console.log(comment);

    });

});