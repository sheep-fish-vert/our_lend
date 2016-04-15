
/* function for line parallaxes */

    function parallaxMouseMove(){

        $('.parallax-layer').each(function(){

            var imgHeight = $(this).find('img').height()+20;

            var imageSrc = '../'+$(this).find('img').attr('src');
            $(this).find('img').remove();
            $(this).find('span').css({'height':imgHeight+'px', 'background-image':'url('+imageSrc+')'});

        });

        $('.parallax-block').each(function(index, el) {
            var centerParallaxBlock = $(this).height()/2;
            $(this).attr('data-center', centerParallaxBlock);
        });

        $(window).resize(function(){

            $('.parallax-block').each(function(index, el) {
                var centerParallaxBlockY = $(this).height()/2;
                var centerParallaxBlockX = $(this).width()/2;
                $(this).attr('data-center-y', centerParallaxBlockY);
                $(this).attr('data-center-x', centerParallaxBlockX);
            });

        });

        $('.parallax-block').mousemove(function(e){

            var coordX = e.pageX;
            var coordY = e.pageY;

            var movedPath = $(this).data('center') - coordX;

            $(this).find('.parallax-layer:not(.not-move)').each(function(index, el) {
                var movedPathWithKoof = movedPath * $(this).data('speed');
                $(this).find('span').css('left', movedPathWithKoof);
            });

        });

    }

/* /function for line parallaxes */

$(document).ready(function(){


});

$(window).load(function(){

    parallaxMouseMove();

});

$(window).resize(function(){

});