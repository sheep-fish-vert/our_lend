
/* function for line parallaxes */

    function parallaxMouseMove(){

        $('.parallax-layer').each(function(){

            var imgHeight = $(this).find('img').height()+20;

            console.log(imgHeight);

            var imageSrc = '../'+$(this).find('img').attr('src');
            $(this).find('img').remove();
            $(this).find('span').css({'height':imgHeight+'px', 'background-image':'url('+imageSrc+')'});

        });

        var documentCenter = $(window).width()/2;

        $(window).resize(function(){

            documentCenter = $(window).width()/2;

        });

        $(document).mousemove(function(e){

            var coordX = e.pageX;

            var movedPath = documentCenter - coordX;

            $('.parallax-layer').each(function(index, el) {
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