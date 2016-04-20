jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var scroller=jQuery.browser.webkit ? "body": "html";

$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};


/* scrollUp */
function scrollUp(block,targetBlock) {

    $(block).click(function(e){
        var head = $('header').outerHeight();
        var target = $(targetBlock).offset().top-head;

        $(scroller).animate({scrollTop:target},800);
        return false;

        e.preventDefault();
    });
}

function oneHeightItems(){

    function oneHeight(block){
        var height=0;
        block.removeAttr('style');
        block.each(function(){
            if($(this).height()>height){
                height=$(this).height();
            }
        });
        block.css('height', height);
    }

    oneHeight($('.oneHeight'));

}

/*GO TO href*/
function goTo(){
    $('nav li a').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var dist = 140;
        if (href == '#top-block') {
            dist = 170;
        };

        var target = $(href).offset().top - dist;

        $(scroller).stop().animate({ scrollTop: target }, 500);

        $('.hum-menu').css('display', 'none');
        $('.asked').css('display', 'block');
        $('.butterbrod').removeClass('active');
         $('body').removeClass('overflover');
    });
}

// cut text script

function cutText(){
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function(){
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if(text.length > value && value > 0){
            var newText = text.substring(0,value) + filler;
            $(this).text(newText);
        }
    });
};


/*header buter*/
function headeButer(menuMobile,toggleMenu){
    if(menuMobile){
        menuMobile.click(function(event) {
            if($(window).width()<1024-$.scrollbarWidth()){
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
            if ($(this).hasClass('active')) {
                $('body').addClass("overflover");
            } else {
                $('body').removeClass("overflover");
            }
        });

        $(document).on('click touchstart',function (event){
            if($(window).width()<1024-$.scrollbarWidth()){
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0)
                    {
                        toggleMenu.slideUp();
                        menuMobile.removeClass('active');
                        if (menuMobile.hasClass('active')) {
                            $('body').addClass("overflover");
                        } else {
                            $('body').removeClass("overflover");
                        }
                    }
            }
        });
    }
}

function headerResizeFunc(){

    $(window).resize(function() {
        if ($('html').hasClass('desktop')) {
            if (($(window).width() > 1024 - $.scrollbarWidth())) {
                $('nav').css('display', 'block');
                $('.asked').css('display', 'block');
                $('.hum-menu').css('display', 'none');
                $('.butterbrod').addClass('active');
                $('body').removeClass('overflover');
            } else {
                $('nav').css('display', 'none');
                $('.hum-menu').css('display', 'none');
                $('.asked').css('display', 'block');
                $('.butterbrod').removeClass('active');
            }
        }
    });

}

/* DOCUMENT READY  */
$(document).ready(function() {
    //oneHeightItems();

    headeButer($('.butterbrod'), $('.hum-menu'));
    scrollUp('.top-block-bottom-arrow, .top-block-footer .color-spec', '.portfolio');

    goTo();

    cutText();

    headerResizeFunc();

});

