function portfolioShowMore(){
    $(document).on('click','.button-show-more button',function(event){
        $('.button-show-more').hide(function(){
            $(this).remove();
        });
        $.ajax({
            url : 'portfolio-ajax.php',
            success : function(data){
                $('.portfolio-wrap').append(data);
                setTimeout(function(){
                    var bottom = $('.portfolio')[0].scrollHeight;
                    $('html,body').animate({scrollTop:bottom},800);
                },200);
            }
        });
    });
}

function rewievsSlider(){
    $('.reviews-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight:true,
        prevArrow:'<button type="button" class="slick-prev border-spec-hover"><span class="border-spec"></span></button>',
        nextArrow:'<button type="button" class="slick-next border-spec-hover"><span class="border-spec"></span></button>',
        draggable:false,
        focusOnSelect:false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });
}
function partnersSlider(){
    $('.partners_slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        //autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight:true,
        prevArrow:'<button type="button" class="slick-prev border-spec-hover"><span class="border-spec"></span></button>',
        nextArrow:'<button type="button" class="slick-next border-spec-hover"><span class="border-spec"></span></button>',
        draggable:false,
        focusOnSelect:false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 479,
              settings: {
                slidesToShow: 1
              }
            }
          ]
    });
}

$(document).ready(function(){
    portfolioShowMore();
    rewievsSlider();
    partnersSlider();
});

$(window).load(function(){

});

$(window).resize(function(){

});
