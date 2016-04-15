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

    color = Math.floor((Math.random() * 3));


    $('head').append('<link rel="icon" href="images/favicon_'+color+'.ico" type="image/x-icon"><link rel="icon" type="image/png" sizes="16x16" href="images/favicon_'+color+'_16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="images/favicon_'+color+'_32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="images/favicon_'+color+'_96x96.png">');

    var randomStyles = '<style data-spec-hover=true>.color-spec{color:#'+colorsMassive[color]+'!important;}.background-spec{background-color:#'+colorsMassive[color]+'!important;}.border-spec{border-color:#'+colorsMassive[color]+'!important;} .border-shadow{border-color:#'+colorsMassive[color]+'!important; box-shadow: 0px 0px 14px 0px #'+colorsMassive[color]+ '; } .color-spec-hover:hover{color: #'+colorsMassiveHover[color]+'!important; }.background-spec-hover:hover{background-color:#'+colorsMassiveHover[color]+'!important; }.border-spec-hover:hover{border-color:#'+colorsMassiveHover[color]+'!important; }.background-spec-reverse{background-color:#'+colorsMassiveHover[color]+'!important; }.background-spec-reverse-hover:hover{background-color:#'+colorsMassive[color]+'!important;}.border-spec-reverse{border-color:#'+colorsMassiveHover[color]+'!important; }.border-spec-reverse-hover:hover{border-color:#'+colorsMassive[color]+'!important; }.svg-spec{fill:#'+colorsMassive[color]+'!important;}.svg-spec-hover:hover{fill:#'+colorsMassiveHover[color]+'!important;}.svg-spec-reverse{fill:#'+colorsMassiveHover[color]+'!important;}.svg-spec-reverse-hover:hover{fill:#'+colorsMassive[color]+'!important;}</style>';

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
            fillHover:null,
            reverseBackground:false,
            reverseColor:false,
            reverseBorder:false,
            reverseFill:false
        }

        $.extend(hoverFuncOptions, hoverOptions);

        var hoverStyle = '';
        var secretHoverStyle = '';
        if(hoverFuncOptions.backgroundHover != null){
            hoverStyle = hoverStyle + 'background-color:#'+ hoverFuncOptions.backgroundHover + '!important;';
            if(!hoverFuncOptions.reverseBackground){
                secretHoverStyle = secretHoverStyle + 'background-color:#bd00fc!important;';
            }else{
                secretHoverStyle = secretHoverStyle + 'background-color:#de8df9!important;';
            }
        }
        if(hoverFuncOptions.colorHover != null){
            hoverStyle = hoverStyle + 'color:#'+ hoverFuncOptions.colorHover + '!important;';
            secretHoverStyle = secretHoverStyle + 'color:#bd00fc!important;';
            if(!hoverFuncOptions.reverseColor){
                secretHoverStyle = secretHoverStyle + 'color:#bd00fc!important;';
            }else{
                secretHoverStyle = secretHoverStyle + 'color:#de8df9!important;';
            }
        }
        if(hoverFuncOptions.borderHover != null){
            hoverStyle = hoverStyle + 'border-color:#'+ hoverFuncOptions.borderHover + '!important;';
            secretHoverStyle = secretHoverStyle + 'border-color:#bd00fc!important;';
            if(!hoverFuncOptions.reverseBorder){
                secretHoverStyle = secretHoverStyle + 'border-color:#bd00fc!important;';
            }else{
                secretHoverStyle = secretHoverStyle + 'border-color:#de8df9!important;';
            }
        }
        if(hoverFuncOptions.fillHover != null){
            hoverStyle = hoverStyle + 'fill:#'+hoverFuncOptions.fillHover + '!important;';
            secretHoverStyle = secretHoverStyle + 'fill:#bd00fc!important;';
            if(!hoverFuncOptions.reverseFill){
                secretHoverStyle = secretHoverStyle + 'fill:#bd00fc!important;';
            }else{
                secretHoverStyle = secretHoverStyle + 'fill:#de8df9!important;';
            }
        }

        var unhoverStyle = '';
        var secretUnhoverStyle = '';
        if(hoverFuncOptions.backgroundUnhover != null){
            unhoverStyle = unhoverStyle + 'background-color:#'+ hoverFuncOptions.backgroundUnhover + '!important;';
            secretUnhoverStyle = secretUnhoverStyle + 'background-color:#de8df9!important;';
            if(!hoverFuncOptions.reverseBackground){
                secretUnhoverStyle = secretUnhoverStyle + 'background-color:#de8df9!important;';
            }else{
                secretUnhoverStyle = secretUnhoverStyle + 'background-color:#bd00fc!important;';
            }
        }
        if(hoverFuncOptions.colorUnhover != null){
            unhoverStyle = unhoverStyle + 'color:#'+ hoverFuncOptions.colorUnhover + '!important;';
            secretUnhoverStyle = secretUnhoverStyle + 'color:#de8df9!important;';
            if(!hoverFuncOptions.reverseColor){
                secretUnhoverStyle = secretUnhoverStyle + 'color:#de8df9!important;';
            }else{
                secretUnhoverStyle = secretUnhoverStyle + 'color:#bd00fc!important;';
            }
        }
        if(hoverFuncOptions.borderUnhover != null){
            unhoverStyle = unhoverStyle + 'border-color:#'+ hoverFuncOptions.borderUnhover + '!important;';
            secretUnhoverStyle = secretUnhoverStyle + 'border-color:#de8df9!important;';
            if(!hoverFuncOptions.reverseBorder){
                secretUnhoverStyle = secretUnhoverStyle + 'border-color:#de8df9!important;';
            }else{
                secretUnhoverStyle = secretUnhoverStyle + 'border-color:#bd00fc!important;';
            }
        }
        if(hoverFuncOptions.fillUnhover != null){
            unhoverStyle = unhoverStyle + 'fill:#'+hoverFuncOptions.fillUnhover + '!important;';
            secretUnhoverStyle = secretUnhoverStyle + 'fill:#de8df9!important;';
            if(!hoverFuncOptions.reverseFill){
                secretUnhoverStyle = secretUnhoverStyle + 'ill:#de8df9!important;';
            }else{
                secretUnhoverStyle = secretUnhoverStyle + 'fill:#bd00fc!important;';
            }
        }

        if(unhoverStyle != ''){
            $(changeItem).attr('style', unhoverStyle);
        }
        if(unhoverStyle != ''){
            $(hoverItem).find(changeItem).addClass('mega-hover').attr('data-unhover', unhoverStyle);
        }

        $(hoverItem).find(changeItem).addClass('mega-hover').attr('data-secret-unhover', secretUnhoverStyle);


        $(hoverItem).hover(
            function(){
                if(hoverStyle != ''){
                    if(!$('body').is('.pink')){
                        $(this).find(changeItem).attr('style', hoverStyle);
                    }else{
                        if(!hoverFuncOptions.reverse){
                            $(this).find(changeItem).attr('style', secretHoverStyle);
                        }else{
                            $(this).find(changeItem).attr('style', secretUnhoverStyle);
                        }
                    }
                }else{
                    $(this).find(changeItem).removeAttr('style');
                }
            },
            function(){
                if(unhoverStyle != ''){
                    if(!$('body').is('.pink')){
                        $(this).find(changeItem).attr('style', unhoverStyle);
                    }else{
                        if(!hoverFuncOptions.reverse){
                            $(this).find(changeItem).attr('style', secretUnhoverStyle);
                        }else{
                            $(this).find(changeItem).attr('style', secretHoverStyle);
                        }
                    }
                }else{
                    $(this).find(changeItem).removeAttr('style');
                }
            }
        );

    }

    specHover('.top-block-button a', '.span-button-arrow', { backgroundUnhover: colorsMassiveHover[color], borderUnhover: colorsMassive[color], backgroundHover: colorsMassive[color], borderHover: colorsMassiveHover[color], reverseBackground: true });
    
    specHover('.logo-block .convert svg', '.st1', { fillUnhover: 'white', fillHover: colorsMassiveHover[color] });
    
    specHover('.services-item', '.button', { borderHover: colorsMassiveHover[color] });
    specHover('.services-item', '.services-circle', {backgroundHover:colorsMassiveHover[color]});
    specHover('.footer-list a', 'svg', {fillHover:colorsMassiveHover[color]});
}

// pony secret
function secret(){
    var ponyId = 0;
    var ponyMain = '<img src=images/secret.gif alt="secret-dance" />';

    $('.logo-block').click(function(){

        if(!$('body').is('.pink') && !$('body').is('.pause')){

            ponyId++;
            if(ponyId == 8){
                $('body').addClass('pink pause');
                $('.mega-hover').each(function() {
                    $(this).attr('style', $(this).data('secret-unhover'));
                });

                $('.secret-erotic-wrap').addClass('active').prepend(ponyMain);
                $('meta[name=theme-color]').remove();
                $('head').append('<meta name="theme-color" content="#E094F8">');

                setTimeout(function(){
                    $('body').removeClass('pause');
                },1000);

                ponyId = 0;
            }

        }
        else if(!$('body').is('.pause') && $('body').is('.pink')){

            $('body').addClass('pause');
            $('.secret-erotic-wrap').removeClass('active');
            setTimeout(function(){
                $('body').removeClass('pink pause');
                $('.mega-hover').each(function() {
                    if($(this).is('[data-unhover]')){
                        $(this).attr('style', $(this).data('unhover'));
                    }else{
                        $(this).removeAttr('style');
                    }
                });
                $('meta[name=theme-color]').remove();
                $('head').append('<meta name="theme-color" content="#88c5bd">');
                $('.secret-erotic-wrap img').remove();
            },400);

        }

    });

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

    headeButer($('.butterbrod'), $('.hum-menu'));
    scrollUp('.top-block-bottom-arrow', '.portfolio');

    randomColors();
    goTo();
    
    cutText();

    secret();

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
});