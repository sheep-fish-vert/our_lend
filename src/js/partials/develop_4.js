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
  var service = $('.services-items-wrap');
    function sliker(){
      service.slick({
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
    $(window).resize(function(event) {
      if( !$('.services-items-wrap').hasClass('slick-slider') && $(window).width() <= 992){
        sliker();
      }else{
        service.slick('unslick');
      }
    });
}
$(document).ready(function(){
    servicesSlider();
    reviewsPopUp();
    portfolioShowMore();
    rewievsSlider();
    partnersSlider();
});

$(window).load(function(){

});

$(window).resize(function(){

});
