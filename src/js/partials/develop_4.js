function portfolioShowMore(){
    $(document).on('click','.button-show-more button',function(event){
        $('.button-show-more').hide(function(){
            $(this).remove();
        });
        $.ajax({
            url : 'portfolio_ajax.php',
            success : function(data){
                $('.portfolio-wrap').append(data);
                setTimeout(function(){
                    var bottom = $('.portfolio')[0].scrollHeight;
                    $('html,body').animate({scrollTop:bottom},300);
                },200);
            }
        });
    });
}
function reviewsPopUp(){
    $(document).on('click','.reviews-slider .social-button button,.reviews-slider .person-img',function(event){
        var id = $(this).data('id');
        $('.preload').addClass('active');

        var autoSize = false;
        if( $(window).width()<=992 ){
            autoSize = true;
        }
        $.ajax({
            type: "POST",
            url: "ajax_reviews_pop.php",
            data: id,
            success: function (data) {
                $.fancybox(data, {
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    wrapCSS:'portfolio-pop reviews_pop_wrapper',
                    'closeBtn' : true,
                    autoSize:true,
                    //autoResize:false,
                    fitToView:true,
                    maxWidth:770,
                    padding:'0',
                    'closeBtn' : true,
                    tpl: {
                        closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close myClose" href="javascript:;"><span class="background-spec"></span><span class="background-spec"></span></a>'
                    },
                    afterShow:function(){
                      setTimeout(function(){
                          $('.preload').removeClass('active');
                          $('.portfolio-pop').addClass('show');
                      },1000);
                    },
                    onUpdate:function(){
                    }
                });
            }
        });
        return false;
    });
}

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
