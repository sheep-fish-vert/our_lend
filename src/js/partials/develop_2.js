


$(document).ready(function() {

    $('.butterbrod').hover(
        function() {
            $(this).find('span').addClass('background-spec');
        },
        function() {
            $(this).find('span').removeClass('background-spec');
        }
    );

    $('.contact-form input').focus(function() { $(this).addClass('border-shadow'); } );
    $('.contact-form input').blur(function() { $(this).removeClass('border-shadow'); })


});

$(window).load(function(){

});

$(window).resize(function(){

});