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
function validationCall(form){

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
    },2000);

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
function portfolioShowMore(){
    $(document).on('click','.button-show-more button',function(event){
        $('.button-show-more').hide(function(){
            $(this).remove();
        });
        $.ajax({
            url : show_More,
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
    portfolioPop();
    validate('#call-popup .contact-form', {submitFunction:validationCall});
    Maskedinput();
    fancyboxForm();
    validate('.contacts-form', {submitFunction:validationCall});
});