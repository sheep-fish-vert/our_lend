


$(document).ready(function () {

    $('.butterbrod').hover(
        function () {
            $(this).find('span').addClass('background-spec');
        },
        function () {
            $(this).find('span').removeClass('background-spec');
        }
    );

    $('.contact-form input').focus(function () { $(this).addClass('border-shadow'); });
    $('.contact-form input').blur(function () { $(this).removeClass('border-shadow'); });

/* yandex metrika */

    $('.portfolio-wrap .item').click(function () {
        redFlag = 'portfolio';
        redFlag += $(this).attr("data-id");
    });

    $('.description-bottom-href button').click(function () { 
        yandexID.reachGoal('want' + redFlag);
        console.log('want' + redFlag);
    });

    $('.services-item .fancybox-form').click(function () {
        redFlag = 'uslugi'+ $(this).find('.services-item').index();      
    });
    
    $('.services-item .fancybox-form').click(function () {
        redFlag = 'uslugi'+ $(this).find('.services-item').index();      
    });

    $('.top-block-wrap .fancybox-form').click(function () {
        redFlag = 'top-big';
    });
    $('header .fancybox-form').click(function () { 
        redFlag = 'header';
    });

    $('.reviews-slider button').click(function () {
        redFlag = 'reviews';
        redFlag += $(this).attr("data-id");
        yandexID.reachGoal('man' + redFlag);
        console.log('man' + redFlag);
    });
    
/* yandex metrika */

});

$(window).load(function(){

});

$(window).resize(function(){

});