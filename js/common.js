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

// ------------------- View type ------------------- //
    $(".js-show-nav").click(function(){
        var sidebar = $(this).parent().parent();
        if($(this).hasClass("js-active")) {
            $(this).removeClass("js-active");
            $(".overlay").fadeOut();
            sidebar.animate({
                left: -210
            }, 100);
        }
        else {
            $(this).addClass("js-active");
            $(".overlay").fadeIn();
            sidebar.animate({
                left: 0
            }, 100);
        }
    });
    
    function adaptive() {
        var width = $(window).width();
        if (width > 1024) {
            $("body").addClass("is-withsidebar");
        }
        else {
            $("body").removeClass("is-withsidebar");
        }
    }
    adaptive();
    $(window).resize(function(){
        adaptive();
    });

});

// ------------------- Buron scroller ------------------- //
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