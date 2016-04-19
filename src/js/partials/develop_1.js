
/* function for line parallaxes */

    function addParallaxImage(){

        $('.parallax-layer').each(function(){

            $(this).prepend('<img src='+$(this).data('img-path')+' alt="">');

        });

    };

    function parallaxMouseMove(){
        setTimeout(function(){

            $('.parallax-layer').each(function(){

                var imgHeight = $(this).find('img').height()+20;

                var imageSrc = './'+$(this).find('img').attr('src');
                $(this).css({'height':imgHeight+'px'});
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
                    $(this).css({'height':imgHeight+'px'});
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

        }, 500);

    }

/* /function for line parallaxes */

/* random color by load */

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

        specHover('.logo-block .convert svg', '.st1', { fillUnhover: 'white', fillHover: colorsMassiveHover[color]});
        specHover('.but-block a', '.header-telefone-svg', {fillUnhover:colorsMassive[color], fillHover:colorsMassive[color], reverseFill:true});

        specHover('.services-item', '.button', { borderHover: colorsMassiveHover[color] });
        specHover('.services-item', '.services-circle', {backgroundHover:colorsMassiveHover[color]});
        specHover('.footer-list a', '.footer-svg', {fillHover:colorsMassiveHover[color]});
    }

/* /random color by load */

/* top-block text hover */

    function topBlockTextHover(){

        $('.top-block-footer p span').hover(
            function(){
                $('.top-block-bottom-arrow').addClass('paused');
            },
            function(){
                $('.top-block-bottom-arrow').removeClass('paused');
            }
        );

    }

/* /top-block text hover */

/* change text in top block by interval */

function changeTextValueByInteval(){

    var itemText = 0;

    function itemTextChange(){
        $('.top-block-descript-wrap').addClass('new-text');
        var textVal = textMas[itemText];
        itemText++;
        if(itemText >= textMas.length){
            itemText = 0;
        }
        setTimeout(function(){
            $('.top-block-descript-wrap h2').text(textVal);
            $('.top-block-descript-wrap').removeClass('new-text');
        },300);
    };

    itemTextChange();

    setInterval(function(){
        itemTextChange()
    },6200);

}

/* /change text top block by inteval */

/* secret */

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

/* /secret */


$(document).ready(function(){

    randomColors();
    topBlockTextHover();

});

$(window).load(function(){

    secret();
    addParallaxImage();
    parallaxMouseMove();
    changeTextValueByInteval();


});

$(window).resize(function(){

});