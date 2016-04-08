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


$(document).ready(function(){
    portfolioShowMore();
});

$(window).load(function(){

});

$(window).resize(function(){

});
