function rewievsSlider(){
    $('.reviews-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        adaptiveHeight:true,
        prevArrow:'<button type="button" class="slick-prev border-spec-hover"><span class="border-spec"></span></button>',
        nextArrow:'<button type="button" class="slick-next border-spec-hover"><span class="border-spec"></span></button>',
        draggable:true,
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
        draggable:true,
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
function servicesSlider(){
  var servic = $('.services-items-wrap');
  $(window).resize(function(event) {
    if( !$('.services-items-wrap').hasClass('slick-slider') && $(window).width() <= 992){
      sliker();
    }else if( $('.services-items-wrap').hasClass('slick-slider') ){
      $('.services-items-wrap').slick("unslick");
    }
  });
    function sliker(){
      servic.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight:true,
        arrows: false,
        draggable:true,
        focusOnSelect:false
      });
    }
    if( $(window).width() <= 992){
      sliker();
    }
}
function navigationScroll(){
    var headHeight = $('header').outerHeight();
    $(window).scroll(function(event) {
        var scrolltop = $(window).scrollTop();
        var point = 0;
        $('.main section').each(function(index, el) {
            if(scrolltop >= $(this).offset().top-headHeight&& ($(this).offset().top + $(this).outerHeight()-headHeight) >= scrolltop){
                point = index;
                $('header .conteiner .mbox2 nav ul li').removeClass('active');
                $('header .conteiner .mbox2 nav ul li').eq(point).addClass('active');
                return false;
            }
        });
    });
}

function preventKeyDown(){
  $(document).keydown(function(event) {
    if( event.keyCode == 123 ){
      return false;
    }else if( event.ctrlKey && event.shiftKey && event.keyCode == 73 ){
      return false;
    }
  });
  $(document).on('contextmenu', function(event) {
    event.preventDefault();
  });
}

$(document).ready(function(){
    //preventKeyDown();
    navigationScroll();
    rewievsSlider();
    partnersSlider();
});

$(window).load(function(){
  //servicesSlider();
});

$(window).resize(function(){

});
