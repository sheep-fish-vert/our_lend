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
        var target = $(targetBlock).offset().top;

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

/*scroll animation*/
function animationBlock(item){

    $(window).scroll(function(){
        checkForAnimate();
    });

    function checkForAnimate(){
        var bottomCheck = $(window).height()+$(window).scrollTop();
        var windowTop = $(window).scrollTop()+($(window).height()/1.5);
        item.each(function(){
           if(windowTop>$(this).offset().top || bottomCheck > $('body').height()*0.98){

              var itemSect = $(this);
              var point = 0;
              itemSect.find('.animate-it').addClass('animated');

              var timer = setInterval(function(){
                 itemSect.find('.animate-delay').eq(point).addClass('animated');
                 point++;
                 if(itemSect.find('.animate-delay').length == point){
                     clearInterval(timer);
                 }
              },200);


           }
        });
    }
    checkForAnimate();
}

/*GO TO href*/
function goTo(){
    $('.header-menu a').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top-65;
        $(scroller).animate({scrollTop:target},500);
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


function randomColors(){

    var colorsMassive = colorScheme.color;
    var colorsMassiveHover = colorScheme.hoverColor;
    var colorsMassiveLength = colorsMassive.length;

    var color = Math.floor((Math.random() * 16));

    var randomStyles = '<style>.color-spec{color:#'+colorsMassive[color]+'!important;}.background-spec{background-color:#'+colorsMassive[color]+'!important;}.border-spec{border-color:#'+colorsMassive[color]+'!important;}.color-spec-hover:hover{color:#'+colorsMassiveHover[color]+'!important;}.background-spec-hover:hover{background-color:#'+colorsMassiveHover[color]+'!important;}.border-spec-hover:hover{border-color:#'+colorsMassiveHover[color]+'!important;}.background-spec-reverse{background-color:#'+colorsMassiveHover[color]+'!important;}.background-spec-reverse-hover:hover{background-color:#'+colorsMassive[color]+'!important;}.border-spec-reverse{border-color:#'+colorsMassiveHover[color]+'!important;}.border-spec-reverse-hover:hover{border-color:#'+colorsMassive[color]+'!important;}</style>';

   $('head').append(randomStyles);


    function specHover(hoverItem, changeItem, hoverOptions){

        var hoverFuncOptions = {
            backgroundUnhover:null,
            colorUnhover:null,
            borderUnhover:null,
            backgroundHover:null,
            colorHover:null,
            borderHover:null
        }

        $.extend(hoverFuncOptions, hoverOptions);

        var hoverStyle = '';
        if(hoverFuncOptions.backgroundHover != null){
            hoverStyle = hoverStyle + 'background-color:#'+ hoverFuncOptions.backgroundHover + '!important;';
        }
        if(hoverFuncOptions.colorHover != null){
            hoverStyle = hoverStyle + 'color:#'+ hoverFuncOptions.colorHover + '!important;';
        }
        if(hoverFuncOptions.borderHover != null){
            hoverStyle = hoverStyle + 'border-color:#'+ hoverFuncOptions.borderHover + '!important;';
        }

        var unhoverStyle = '';
        if(hoverFuncOptions.backgroundUnhover != null){
            unhoverStyle = unhoverStyle + 'background-color:#'+ hoverFuncOptions.backgroundUnhover + '!important;';
        }
        if(hoverFuncOptions.colorUnhover != null){
            unhoverStyle = unhoverStyle + 'color:#'+ hoverFuncOptions.colorUnhover + '!important;';
        }
        if(hoverFuncOptions.borderUnhover != null){
            unhoverStyle = unhoverStyle + 'border-color:#'+ hoverFuncOptions.borderUnhover + '!important;';
        }

        if(unhoverStyle != ''){
            $(changeItem).attr('style', unhoverStyle);
        }

        $(hoverItem).hover(
            function(){
                if(hoverStyle != ''){
                    $(changeItem).attr('style', hoverStyle);
                }
            },
            function(){
                if(unhoverStyle != ''){
                    $(changeItem).attr('style', unhoverStyle);
                }
            }
        );

    }

    specHover('.top-block-button a', '.top-block-button a .span-button-arrow', {backgroundUnhover:colorsMassiveHover[color],borderUnhover:colorsMassive[color],backgroundHover:colorsMassive[color],borderHover:colorsMassiveHover[color]});


}


/*header buter*/
function headeButer(menuMobile,toggleMenu){
    if(menuMobile){
        menuMobile.click(function(event) {
            if($(window).width()<1024-$.scrollbarWidth()){
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart',function (event){
            if($(window).width()<1024-$.scrollbarWidth()){
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0)
                    {
                        toggleMenu.slideUp();
                        menuMobile.removeClass('active');
                    }
            }
        });
    }
}

/* DOCUMENT READY  */
$(document).ready(function() {
    //oneHeightItems();
    $('.footer_placeholder').height($('.footer').outerHeight());

    scrollUp('.top-block-bottom-arrow', '.portfolio');

    randomColors();

    cutText();

});

$(window).resize(function() {

    $('.footer_placeholder').height($('.footer').outerHeight());
});