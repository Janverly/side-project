$(document).ready(function(){
    $(function(){

        $("#date").datepicker({
            dateFormat: "yy-mm-dd",
            minDate: 1
        }).attr("readonly", true);

        $("#myForm").submit(function(e){
            e.preventDefault();

            let name = $("#name").val().trim();
            let email = $("#email").val().trim();
            let title = $("#title").val().trim();
            let date = $("#date").val();

            if(!name || !email || !title || !date){
                alert("Please fill out all fields!");
                return;
            }

            if(!email.includes("@")){
                alert("Invalid email!");
                return;
            }

            let today = new Date();
            today.setHours(0,0,0,0);

            if(new Date(date) <= today){
                alert("Pick at least tomorrow!");
                return;
            }

            $("#successText").text(
                name + ', your ' + title + ' appointment  is scheduled on ' + date + '!'
            );

            $("#successDialog").dialog({
                modal: true
            });

        });

    });
});
