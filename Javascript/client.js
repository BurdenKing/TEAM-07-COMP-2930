$(document).ready(() => {
    
    // PERFORM A HTTP POST, AND GET A RESPONSE FROM THE SERVER
    $('#submit').click(e => {

        e.preventDefault();

        let formData = { 
                        email: $("#create_acc_email").val(),
                        password: $("#create_acc_password").val(),
                        firstname: $("#create_acc_firstname").val(),
                        lastname: $("#create_acc_lastname").val(),
                        type: $("#create_acc_type").val()
                    };
                       
        console.log("Form data to send:", formData);

        $.ajax({
            url: "/create-acc",
            dataType: "json",
            type: "POST",
            data: formData,
            success: function(data) {
                console.log("SUCCESS JSON:", data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#msg").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

});
