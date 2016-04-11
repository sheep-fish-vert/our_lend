
function randomColors(){

    var colorsMassive = ['ff6e40', 'ff5252', 'ff4081', 'fe40fb', '7c4dff', '536dfe', '448aff', '40c4ff', '18ffff', '64ffda', '69f0ae', 'b2ff59', 'eeff41', 'ffff00', 'ffd740', 'ffab40'];
    var colorsMassiveHover = ['ff5252', 'ff4081', 'fe40fb', '7c4dff', '536dfe', '448aff', '40c4ff', '18ffff', '64ffda', '69f0ae', 'b2ff59', 'eeff41', 'ffff00', 'ffd740', 'ffab40', 'ff6e40'];
    var colorsMassiveLength = colorsMassive.length;

    var textColor = Math.floor((Math.random() * 16));
    var borderAndBackgroundColor = null;
    var timer = null;

    timer = setInterval(function(){
        borderAndBackgroundColor = Math.floor((Math.random() * 16));
        if(textColor != borderAndBackgroundColor){
            var randomStyles = '<style>.color-spec{color:#'+colorsMassive[textColor]+'!important;}.background-spec{background-color:#'+colorsMassive[borderAndBackgroundColor]+'!important;}.border-spec{border-color:#'+colorsMassive[borderAndBackgroundColor]+'!important;}.color-spec-hover:hover{color:#'+colorsMassiveHover[textColor]+'!important;}.background-spec-hover:hover{background-color:#'+colorsMassiveHover[borderAndBackgroundColor]+'!important;}.border-spec-hover:hover{border-color:#'+colorsMassiveHover[borderAndBackgroundColor]+'!important;}.background-spec-second{background-color:#'+colorsMassiveHover[borderAndBackgroundColor]+'!important;}.background-spec-second-hover:hover{background-color:#'+colorsMassive[borderAndBackgroundColor]+'!important;}.border-spec-second{border-color:#'+colorsMassiveHover[borderAndBackgroundColor]+'!important;}.border-spec-second-hover:hover{border-color:#'+colorsMassive[borderAndBackgroundColor]+'!important;}</style>';

            $('head').append(randomStyles);
            clearInterval(timer);
        }

    },0);




}


$(document).ready(function(){

    randomColors();

});

$(window).load(function(){

});

$(window).resize(function(){

});