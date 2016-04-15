
/* function for line parallaxes */

    function parallaxMouseMove(){

        $('.parallax-layer').each(function(){

            var imgHeight = $(this).find('img').height()+20;

            var imageSrc = '../'+$(this).find('img').attr('src');
            $(this).find('span').css({'height':imgHeight+'px', 'background-image':'url('+imageSrc+')'});

        });

        $('.parallax-block').each(function(index, el) {
            var centerParallaxBlockY = $(this).height()/2;
            var centerParallaxBlockX = $(this).width()/2;
            $(this).attr('data-center-y', centerParallaxBlockY);
            $(this).attr('data-center-x', centerParallaxBlockX);
        });

        $(window).resize(function(){

            $('.parallax-layer').each(function(){

                var imgHeight = $(this).find('img').height()+20;
                $(this).find('span').css({'height':imgHeight+'px'});

            });

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

            var movedPathX = $(this).data('center-x') - coordX;
            var movedPathY = null;

            if($(this).is('.y-too')){
                movedPathY = $(this).data('center-y') - coordY;
            }

            $(this).find('.parallax-layer:not(.not-move)').each(function(index, el) {
                var movedPathWithKoofX = movedPathX * $(this).data('speed');

                if(movedPathY != null){
                    var movedPathWithKoofY = movedPathY * $(this).data('speed');
                    $(this).find('span').css({'left': movedPathWithKoofX+'px', 'top': movedPathWithKoofY+'px'});
                }else{
                    $(this).find('span').css({'left': movedPathWithKoofX+'px'});
                }

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