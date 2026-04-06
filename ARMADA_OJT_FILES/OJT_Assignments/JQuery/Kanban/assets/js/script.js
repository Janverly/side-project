$(document).ready(function(){
    $(function() {
            $(".connected").sortable({
                connectWith: ".connected",  
                placeholder: "ui-state-highlight"
            }).disableSelection();
        });
})
    
   