$(document).ready(function(){

    $('a').click(function(){
        e.preventDefault();
        $('#content').load($(this).attr(href));
    });

});