/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall1(form) {

    yandexID.reachGoal('popup' + redFlag);
    console.log('popup' + redFlag);

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : ajaxUrl,
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}
function validationCall2(form){
    yandexID.reachGoal('contacts-form');
    console.log('contacts-form');
  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : ajaxUrl,
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}

function popNext(popupId, popupWrap){

    $.fancybox.open(popupId,{
        padding:0,
        fitToView:false,
        'closeBtn' : false,
        wrapCSS:popupWrap,
        autoSize:true,
        afterClose: function(){
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;

    timer = setTimeout(function(){
        $('form').trigger("reset");
        $.fancybox.close(popupId);
    },2500);

}


/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}

/*fansybox на форме*/
function fancyboxForm(){
  $('.fancybox-form').fancybox({
    openEffect  : 'fade',
    closeEffect: 'fade',
    autoResize:true,
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    fitToView:true,
    padding:'0',
    tpl: {
        closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close myClose" href="javascript:;"><span class="background-spec"></span><span class="background-spec"></span></a>'
    }
  })
}

//ajax func for programmer

function someAjax(item, someUrl, successFunc, someData){

    $(document).on('click', item, function(e){

        e.preventDefault();

        var itemObject = $(this);
        var ajaxData = null;

        if(typeof someData == 'function'){
            ajaxData = someData(itemObject);
        }else{
            ajaxData = someData;
        }

        console.log(ajaxData);

        $.ajax({
            url:ajaxUrl,
            data:ajaxData,
            method:'POST',
            success : function(data){
                successFunc(data, itemObject);
            }
        });

    });

}

function portfolioPop(){
    $(document).on('click','.portfolio-wrap .item',function(event) {
        event.preventDefault();
        $('.preload').addClass('active');
        var id = $(this).data('id'),
            mainImg,jspApi,mainText,jspApiText = null;
            autoSize = false;
        if( $(window).width()<=992 ){
            autoSize = true;
        }

        function heightImg(){
            var popHeight = $('.portfolio-pop').height();
            var imgMargin = parseInt($('.main-img').css('margin-top'));
            $('.main-img').height(popHeight-imgMargin);
        }
        function heightSubText(){
            if( $('.portfolio-pop .description-center-text').outerHeight()>200){
                $('.portfolio-pop .description-center-text').height(200);
                setTimeout(function(){
                    mainText = $('.portfolio-pop .description-center-text');
                    mainText.jScrollPane();
                    jspApiText = mainText.data('jsp');
                },0)
            }
        }
        function initJscrollMainImg(){
            mainImg = $('.main-img');
            mainImg.jScrollPane();
            jspApi = mainImg.data('jsp');
        }
        $.ajax({
            type: "POST",
            url: ajax_Port_Pop,
            data: id,
            success: function (data) {
                $.fancybox(data, {
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    wrapCSS:'portfolio-pop',
                    'closeBtn' : true,
                    height:800,
                    width:1580,
                    autoSize:autoSize,
                    'autoDimensions':false,
                    padding:'0',
                    'closeBtn' : false,
                    tpl: {
                        closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close myClose" href="javascript:;"><span class="background-spec"></span><span class="background-spec"></span></a>'
                    },
                    afterShow:function(){
                        console.log('afterShow');

                        //desctop version

                        if( $(window).width()>992 ){
                            heightImg();
                            heightSubText();

                            /*main img*/
                            initJscrollMainImg();

                            mainImg.bind('jsp-initialised',function(event, isScrollable){
                                setTimeout(function(){
                                    $('.preload').removeClass('active');
                                    $('.portfolio-pop').addClass('show');
                                },1000);
                            });

                            console.log('jspApi ' , jspApi);
                        }


                    },
                    onUpdate:function(){
                        //desctop version
                        if( $(window).width()>992 ){
                            heightImg();
                            jspApi.reinitialise();
                            if( !$('.main-img').hasClass('jspScrollable') ){
                                initJscrollMainImg();
                            }
                            heightSubText();
                        }else{
                            /*main img*/
                            mainImg = $('.main-img');
                            mainImg.jScrollPane();
                            jspApi = mainImg.data('jsp');
                            jspApi.destroy();


                            mainText = $('.portfolio-pop .description-center-text');
                            mainText.jScrollPane();
                            jspApiText = mainText.data('jsp');
                            jspApiText.destroy();
                            setTimeout(function(){
                                $('.preload').removeClass('active');
                                $('.portfolio-pop').addClass('show');
                                $('.main-img').removeAttr('style');
                                mainText.removeAttr('style');
                            },1000);
                        }
                    }
                });
            },
            error: function (data) {
                return false;
            }
        });
        return false;

    });

    $(document).on('click','.portfolio-pop .myClose', function(event) {
        $.fancybox.close();
    });

    $(document).on('click', '.description-bottom-href button', function(event) {
        event.preventDefault();
        $.fancybox.close();
        $('html,body').animate({scrollTop:$('.contacts-main-title').offset().top},800);
        $('.contacts-form-wrap-main').find('input[name=your_name]').focus();
    });
}

function portfolioPop2(){
    $(document).on('click','.portfolio-wrap .item',function(event) {

        event.preventDefault();
        $('.preload').addClass('active');
        var id = $(this).data('id'), mainImg, jspApi, mainText, jspApiText = null;
        var autoSize = false;

        //размер айфрейма
        function heightImg(){
            //var popHeight = $('.portfolio-pop.fancybox-opened').height();
            var popHeight = $('.portfolio-pop.fancybox-opened .fancybox-inner').height();
            var popDescription = $('.portfolio-pop.fancybox-opened .description').outerHeight();
            var newHeight = popHeight;
            if( popDescription>popHeight ){
                newHeight = popDescription;
            }
            var imgMargin = parseInt($('.main-img').css('margin-top'));
            $('.portfolio-pop.fancybox-opened .main-img').height(newHeight-imgMargin);
        }
        //вставить имагу
        function appendImg(){
            var imgSrc = $('.portfolio-pop.fancybox-opened .main-img-wrap').data('img');
            var img = '<img src="'+imgSrc+'" alt="" />';
            $('.portfolio-pop.fancybox-opened .main-img-wrap').append(img);
        }

        //недефолтный скролл на текст если >200px
        function heightSubText(){
            if( $('.portfolio-pop.fancybox-opened .description-center-text').outerHeight()>200){
                $('.portfolio-pop.fancybox-opened .description-center-text').height(200);
                setTimeout(function(){
                    mainText = $('.portfolio-pop.fancybox-opened .description-center-text');
                    mainText.jScrollPane();
                    jspApiText = mainText.data('jsp');
                },0)
            }
        }

        function initJscrollMainImg(){
            mainImg = $('.portfolio-pop.fancybox-opened .main-img');
            mainImg.jScrollPane();
            jspApi = mainImg.data('jsp');
        }

        $.fancybox.open('#portfolio-'+id+'',{
            openEffect  : 'fade',
            closeEffect : 'fade',
            wrapCSS:'portfolio-pop',
            'closeBtn' : true,
            height:815,
            width:1580,
            autoSize:autoSize,
            'autoDimensions':false,
            padding:'0',
            'closeBtn' : false,
            tpl: {
                closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close myClose" href="javascript:;"><span class="background-spec"></span><span class="background-spec"></span></a>'
            },
            afterShow:function(){
                console.log('afterShow');

                appendImg();
                if( $(window).width()>992 ){
                    heightImg();
                    heightSubText();
                    /*main img*/

                    setTimeout(function(){
                        $('.preload').removeClass('active');
                        $('.portfolio-pop').addClass('show');
                        initJscrollMainImg();
                    },1000);
                }
            },
            onUpdate:function(){
                //desctop version
                if( $(window).width()>992 ){

                    console.log('jspApi ' , jspApi);
                    heightImg();
                    jspApi.reinitialise();
                    if( !$('.main-img').hasClass('jspScrollable') ){
                        initJscrollMainImg();
                    }
                    heightSubText();
                }else{
                    /*main img*/
                    mainImg = $('.portfolio-pop.fancybox-opened .main-img');
                    mainImg.jScrollPane();
                    jspApi = mainImg.data('jsp');
                    jspApi.destroy();


                    mainText = $('.portfolio-pop .description-center-text');
                    mainText.jScrollPane();
                    jspApiText = mainText.data('jsp');
                    jspApiText.destroy();
                    setTimeout(function(){
                        $('.preload').removeClass('active');
                        $('.portfolio-pop').addClass('show');
                        $('.main-img').removeAttr('style');
                        mainText.removeAttr('style');
                    },1000);
                }
            }
        });

    });
}

function portfolioShowMore(){
    $(document).on('click','.button-show-more button:not(.preload2, .no-more)',function(event){
        var itemButton = $(this);
        var id = $(this).data('button-id');
        var page = parseInt($(this).data('page'));
        var elementsPrepage = $(this).data('prepage');
        itemButton.addClass('preload2');
        $.ajax({
            url : 'js/json/show_more.json', // show_More
            data: {page:page, elementsPrepage:elementsPrepage},
            success : function(data){

                var dataParsed = JSON.parse(data);

                dataParsed.items.forEach(function(item, i, arr){
                    $('.portfolio-wrap').append('<div class="item" data-id='+item.item_id+'><a href="#"><div class="item-img"><img src="'+item.item_img+'" alt=""></div><div class="item-text"><div class="item-text-wrap border-spec"><div class="item-type color-spec"><span>'+item.item_top_text+'</span></div><div class="item-name"><h3>'+item.item_name+'</h3><span class="background-spec"></span></div><div class="item-desc"><p>'+item.item_bottom_text+'</p></div></div></div></a></div>');
                    if(i == (arr.length-1)){
                        itemButton.attr('data-page', page+1);
                        itemButton.removeClass('preload2');
                        if( $(window).width()>600){
                            setTimeout(function(){
                                var bottom = $('.portfolio')[0].scrollHeight;
                                $('html,body').animate({scrollTop:bottom},300);
                            },200);
                        }

                    }
                });

                if(data.last){
                    itemButton.removeClass('preload2').addClass('no-more');
                    itemButton.parent().find('.button-show-text p').text('Продолжение следует...');
                }

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
            url: ajax_Reviw_Pop,
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
                    }
                });
            }
        });
        return false;
    });
}
$(document).ready(function(){
    portfolioPop2();
    //portfolioPop();
    reviewsPopUp();
    portfolioShowMore();
    validate('#call-popup .contact-form', {submitFunction:validationCall1});
    Maskedinput();
    fancyboxForm();
    validate('.contacts-form', {submitFunction:validationCall2});
});