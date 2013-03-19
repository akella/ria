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
// ------------------- Custom scroll ------------------- //
    baron($('.js-scroll-1'), {
        scroller: '.scroll',
        container: '.scroll__container',
        bar: '.scroll__bar span',
        barOnCls: 'baron',
        header: '.header__title',
        hFixCls: 'header__title_state_fixed',
        hBeforeFixCls: 'header__title_position_top',
        hAfterFixCls: 'header__title_position_bottom'
    });
    baron($('.js-scroll-3'), {
        scroller: '.scroll',
        container: '.scroll__container',
        bar: '.scroll__bar span',
        barOnCls: 'baron',
        header: '.header__title',
        hFixCls: 'header__title_state_fixed',
        hBeforeFixCls: 'header__title_position_top',
        hAfterFixCls: 'header__title_position_bottom'
    });
});

