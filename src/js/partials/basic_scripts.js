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
        
        $(scroller).animate({ scrollTop: target }, 500);

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


function randomColors(){

    var colorsMassive = colorScheme.color;
    var colorsMassiveHover = colorScheme.hoverColor;
    var colorsMassiveLength = colorsMassive.length;
    var color = null;

    color = Math.floor((Math.random() * 16));

    var randomStyles = '<style data-spec-hover=true>.color-spec{color:#'+colorsMassive[color]+'!important;}.background-spec{background-color:#'+colorsMassive[color]+'!important;}.border-spec{border-color:#'+colorsMassive[color]+'!important;} .border-shadow{border-color:#'+colorsMassive[color]+'!important; box-shadow: 0px 0px 14px 0px #'+colorsMassive[color]+ '; } .color-spec-hover:hover{color: #'+colorsMassiveHover[color]+'!important; }.background-spec-hover:hover{background-color:#'+colorsMassiveHover[color]+'!important; }.border-spec-hover:hover{border-color:#'+colorsMassiveHover[color]+'!important; }.background-spec-reverse{background-color:#'+colorsMassiveHover[color]+'!important; }.background-spec-reverse-hover:hover{background-color:#'+colorsMassive[color]+'!important;}.border-spec-reverse{border-color:#'+colorsMassiveHover[color]+'!important; }.border-spec-reverse-hover:hover{border-color:#'+colorsMassive[color]+'!important; }.svg-spec{fill:#'+colorsMassive[color]+'!important;}.svg-spec-hover:hover{fill:#'+colorsMassiveHover[color]+'!important;}</style > ';

    $('head').append(randomStyles);

    $('#preload-circle').attr('stroke', '#'+colorsMassive[color]);
    $('#meta-color,#meta-color2').attr('content', '#'+colorsMassive[color]);


    function specHover(hoverItem, changeItem, hoverOptions){

        var hoverFuncOptions = {
            backgroundUnhover:null,
            colorUnhover:null,
            borderUnhover:null,
            fillUnhover:null,
            backgroundHover:null,
            colorHover:null,
            borderHover:null,
            fillHover:null
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
        if(hoverFuncOptions.fillHover != null){
            hoverStyle = hoverStyle + 'fill:#'+hoverFuncOptions.fillHover + '!important;';
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
        if(hoverFuncOptions.fillUnhover != null){
            unhoverStyle = unhoverStyle + 'fill:#'+hoverFuncOptions.fillUnhover + '!important;';
        }

        if(unhoverStyle != ''){
            $(changeItem).attr('style', unhoverStyle);
        }

        $(hoverItem).hover(
            function(){
                if(hoverStyle != ''){
                    $(this).find(changeItem).attr('style', hoverStyle);
                }
            },
            function(){
                if(unhoverStyle != ''){
                    $(this).find(changeItem).attr('style', unhoverStyle);
                }
            }
        );

    }

     
    specHover('.top-block-button a', '.span-button-arrow', {backgroundUnhover:colorsMassiveHover[color],borderUnhover:colorsMassive[color],backgroundHover:colorsMassive[color],borderHover:colorsMassiveHover[color]})

    specHover('.logo-block .convert svg', '.st1', { fillUnhover: 'white', fillHover: colorsMassiveHover[color] });
    specHover('.footer-list a', 'svg', {fillUnhover:'8d8d8d', fillHover:colorsMassiveHover[color]});


}


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

/* DOCUMENT READY  */
$(document).ready(function() {
    //oneHeightItems();
    $('.footer_placeholder').height($('.footer').outerHeight());

    headeButer($('.butterbrod'), $('.hum-menu'));
    scrollUp('.top-block-bottom-arrow', '.portfolio');

    randomColors();
    goTo();
    
    cutText();

});

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

    $('.footer_placeholder').height($('.footer').outerHeight());
});