$(document).ready(function() {

// ------------------- View type ------------------- //
    $(".js-view-type").click(function(){
        var list = $(this).parent().children(".js-drop-down");
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            list.slideUp("fast");
        }
        else {
            $(this).addClass("is-active");
            list.slideDown("fast");
        }
    });

    
});

// ------------------- Custom scroll ------------------- //
window.onload = function() {
    baron($('.js-scroller-1'), {
        scroller: '.scroller',
        container: '.scroller__container',
        bar: '.scroller__bar span',
        barOnCls: 'baron'
    });
    $('.js-scroller-2').baron({barOnCls: 'baron'});
    $('.js-scroller-3').baron({barOnCls: 'baron'});
};