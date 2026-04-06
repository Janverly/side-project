$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    });

    $('.popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    $('.card').on('click', function(){

        let name = $(this).data('name');
        let desc = $(this).data('desc');
        let img = $(this).find('img').attr('src');

        $('#agentTitle').text(name);
        $('#agentDesc').text(desc);
        $('#agentImage').attr('src', img);

        $('.details').effect("highlight", {}, 500);
    });

});