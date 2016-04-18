
// secret
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

$(document).ready(function(){


});

$(window).load(function(){

    secret();

});

$(window).resize(function(){

});