$(document).ready(function()
{
    $('.mini_boxes').click(function(event){
        event.stopPropagation();

    $('.mini_boxes').removeClass('selected');
    $(this).addClass('selected')

    var imgsrc = $(this).attr('src');
    $('.main_box').css ("background-image", 'url('+ imgsrc +')');
    
});

    $('.main_box').click(function (){
               
    $(this).css('background-color', "lightgray");
    $(this).css('background-color', "none");
    $('.mini_boxes').removeClass('selected');

    })
});