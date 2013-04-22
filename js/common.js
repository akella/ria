
// ------------------- Buron scroller ------------------- //
window.onload = function() {
    if ($('.js-scroller-1').length > 0) {
        baron($('.js-scroller-1'), {
            scroller: '.scroller',
            container: '.scroller__container',
            bar: '.scroller__bar span',
            barOnCls: 'baron'
        });
    }
    if ($('.js-scroller-2').length > 0) {
        $('.js-scroller-2').baron({
            barOnCls: 'baron',
            // header: '.js-scroller-head',
            // // CSS class for fixed headers
            // hFixCls: 'news-top__fixed',
            // // CSS class for lowest fixed header of top headers group
            // hBeforeFixCls: 'news-top__position-top',
            // // !!! Remaned from hTopFixCls
            // // CSS class for uppermost fixed header of bottom headers group
            // hAfterFixCls: 'news-top__position-bottom'

        });
    }
    if ($('.js-scroller-3').length > 0) {
        $('.js-scroller-3').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-4').length > 0) {
        $('.js-scroller-4').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-5').length > 0) {
        $('.js-scroller-5').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-6').length > 0) {
        $('.js-scroller-6').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-popup').length > 0) {
        $('.js-scroller-popup').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-list').length > 0) {
        $('.js-scroller-list').each(function(){
            $(this).baron({barOnCls: 'baron'});
        });  
    }
    if ($('.js-scroller-var').length > 0) {
        $('.js-scroller-var').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-search').length > 0) {
        $('.js-scroller-search').baron({barOnCls: 'baron'});
    }
    if ($('.js-scroller-search-small').length > 0) {
        $('.js-scroller-search-small').baron({barOnCls: 'baron'});
    }

}

$(document).ready(function() {

    function sticky_load() {
        $('.js-scroller-2').baron({barOnCls: 'baron'});
        $(".js-news-top").each(function(){
            var thisSticky = $(this).wrap('<div class="js-follow-wrap" />');
            var height = thisSticky.parent().height(thisSticky.outerHeight());
            $.data(thisSticky[0], 'pos', thisSticky.position().top);
        });
    }
    function sticky_scroll() {
        $(".js-news-top").each(function(i){                
            var thisSticky = $(this),
                nextSticky = $(".js-news-top").eq(i+1),
                prevSticky = $(".js-news-top").eq(i-1),
                position = $.data(thisSticky[0], 'pos'); 
            if (position <= $(".js-scroller-2 .scroller").scrollTop()) {
                var pos_parent = Math.abs($(".js-scroller-2 .scroller__container").position().top);
                thisSticky.addClass("fixed");
                //$(".search input").val(pos_parent);
                //$(".main-head__title").text($.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
                if (pos_parent >= $.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
                    thisSticky.addClass("absolute").css("top", $.data(nextSticky[0], 'pos') - pos_parent - thisSticky.outerHeight());
                }
            } 
            else {
                thisSticky.removeClass("fixed");
                if (prevSticky.length > 0 && $(".js-scroller-2 .scroller").scrollTop() <= $.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
                    prevSticky.removeClass("absolute").removeAttr("style");
                }
            }

        });         
    }

    if ($(".js-scroller-2 .scroller").length > 0) {
        sticky_load();
        $(".js-scroller-2 .scroller").on("scroll", function() {
            sticky_scroll();
        });
    }
    
// ------------------- Fancybox ----------------------// 
    $(".media-link").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        padding: 20,
        helpers : {
            title : {
                type : 'outside'
            }
        } 
    });
    $(".js-create").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        padding: 20,
        helpers : {
            title : {
                type : 'outside'
            }
        } 
    });
// ------------------- Popup  ------------------- //
    $(".email .btn-opt").click(function(){
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(".js-popup-send").fadeOut("fast");
            $(".overlay-popup").fadeOut()
        }
        else {
            $(this).addClass("is-active");
            $(".js-popup-send").fadeIn("fast");
            $(".overlay-popup").fadeIn()
        }
    });

    $(".overlay-popup, .popup-close").click(function(){
        $(".popup-easy").fadeOut();
        $(".overlay-popup").fadeOut();
        $(".email .btn-opt").removeClass("is-active");
    });
    //$(".js-popup-create").show();
// ------------------- View type ------------------- //
    $(".js-btn-opt").click(function(){
        var overlay = $(this).parent().parent().parent().children(".toolbar__overlay");
        var list = $(this).parent().children(".js-drop-down");

        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            list.slideUp("fast");
            overlay.hide();
        }
        else {
            $(".js-btn-opt").removeClass("is-active");
            $(".js-drop-down").slideUp("fast");
            $(this).addClass("is-active");
            list.slideDown("fast");
            overlay.show()
            if ($('.js-scroller-list').length > 0) {
                $('.js-scroller-list').baron({barOnCls: 'baron'});
            }
            else {}
        }
    });
    // Click on toolbar__overlay
    $(".toolbar__overlay").click(function(){
        $(".toolbar__overlay").fadeOut();
        $(".btn-opt").removeClass("is-active");
        $(".js-drop-down").slideUp("fast");
    });



// ------------------- Show nav ------------------- //
    $(".js-show-nav").click(function(){
        var sidebar = $(this).parent().parent();
        if($(this).hasClass("js-active")) {
            $(this).removeClass("js-active");
            $(".overlay").fadeOut();
            sidebar.animate({
                left: -210
            }, 100);
            $(".l-sidebar").afterTransition(function () {
                $(".l-sidebar").css("z-index", "2");
            });
        }
        else {
            $(this).addClass("js-active");
            $(".overlay").fadeIn();
            sidebar.animate({
                left: 0
            }, 100);
            $(".l-sidebar").css("z-index", "2000");
        }
    });

    // Click on overlay
    $(".overlay").click(function(){
        $(this).fadeOut();
        $(".js-show-nav").removeClass("js-active");
        $(".l-sidebar").animate({
            left: -210
        }, 100);
    });

// ------------------- Adaptive sidebar ------------------- //  
    function adaptive() {
        var width = $(window).width();
        if (width > 1000) {
            $("body").addClass("is-withsidebar");
        }
        else {
            $("body").removeClass("is-withsidebar");
            hide_window();
        }
    }
    adaptive();
    $(window).resize(function(){
        adaptive();
    });

// ------------------- Show wall ------------------- //
    $(".js-show-wall").click(function(){
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(this).text("Все ленты");
            $("body").removeClass("is-withwall");
            // $(".l-layout").animate({
            //     right: 0
            // }, 500);
            $(".l-wall-news").removeClass("is-active").afterTransition(function () {
                if ($('.js-scroller-2').length > 0) {
                    $('.js-scroller-2').baron({barOnCls: 'baron'});
                }
                if ($('.js-scroller-3').length > 0) {
                    $('.js-scroller-3').baron({barOnCls: 'baron'});
                }
                if ($('.js-scroller-6').length > 0) {
                    $('.js-scroller-6').baron({barOnCls: 'baron'});
                }
            });
            hide_window();
        }
        else {
            $(this).addClass("is-active");
            $(this).text("Скрыть");
            $("body").addClass("is-withwall");
            // $(".l-layout").animate({
            //     right: 210
            // }, 500);
            $(".l-wall-news").addClass("is-active").afterTransition(function () {
                if ($('.js-scroller-2').length > 0) {
                    $('.js-scroller-2').baron({barOnCls: 'baron'});
                }
                if ($('.js-scroller-3').length > 0) {
                    $('.js-scroller-3').baron({barOnCls: 'baron'});
                }
                if ($('.js-scroller-6').length > 0) {
                    $('.js-scroller-6').baron({barOnCls: 'baron'});
                }
            });
        }
        // reinit columns with dragable
        //resize_proportions();
        column_width();
    });

// ------------------- Show tooltip ------------------- //
    $(".btn-opt").hover(
        function () {
            $(this).parent().children(".tooltip").css("zIndex", 1000);
        },
        function () {

            $(this).parent().children(".tooltip").afterTransition(function () {
                $(this).parent().children(".tooltip").css("zIndex", 1);
            });
        }
    )

// ------------------- Checkbox ------------------- //
    function checkbox() {
        $(".check").click(function(){
            var check = $(this).children("span");
            var input = $(this).children("input");
            var news = $(this).parent();
            if(check.hasClass("is-checked")) {
                check.removeClass("is-checked");
                input.removeAttr("checked");
                news.removeClass("is-selected");
            }
            else {
                check.addClass("is-checked");
                input.attr("checked", "checked");
                news.addClass("is-selected");
            }
        });
        // just one checkbox
        $(".check strong").click(function(){
            var check = $(this).parent().children("span");
            var input = $(this).parent().children("input");
            if(check.hasClass("is-checked")) {
                check.removeClass("is-checked");
                input.removeAttr("checked");
            }
            else {
                check.addClass("is-checked");
                input.attr("checked", "checked");
            }
        });
        $(".check").click(function(){
            var check = $(this).find(".is-blocked");
            var input = $(this).find("input");
            check.removeClass("is-checked");
            input.removeAttr("checked");
        });
    }
    checkbox();
    
// ------------------- Block input on check ------------------- //
    function block_input() {
        $(".js-block-input input").click(function(){
            var input = $(this).parent().parent().children(".input").children("input");
            if ($(this).next().hasClass("is-checked")) {
                input.removeClass("is-disabled");
                input.removeAttr("disabled");
            }
            else {
                input.addClass("is-disabled");
                input.attr("disabled","");
            }
        });
    }
    block_input();
    


// ------------------- Radio ------------------- //
    function radio() {
        $(".radio label").change(function(){
            var radio = $(this).children("i");
            var input = $(this).children("input");
            var group = $(this).parent(".js-radio-group");
            var all_radio = $(this).parent(".radio").parent(".js-radio-group").children(".radio").children("label").children("i");
            var all_input = $(this).parent(".radio").parent(".js-radio-group").children(".radio").children("label").children("input");
            if(radio.hasClass("is-active")) {
                radio.removeClass("is-active");
                input.removeAttr("checked");
            }
            else {
                all_radio.removeClass("is-active")
                all_input.removeAttr("checked", "checked");
                radio.addClass("is-active");
                input.attr("checked", "checked");
            }
        });
    }
    radio();

// ------------------- Toolbar ------------------- //    
    function toolbar() {
        var quantity = $(".news .is-selected").length;
            if (quantity > 0) {
                $(".toolbar").addClass("toolbar_extend");
            }
            else {
                $(".toolbar").removeClass("toolbar_extend");
            }
        $(".news li a, .news .check").click(function(){
            var quantity = $(".news .is-selected").length;
            if (quantity > 0) {
                $(".toolbar").addClass("toolbar_extend");
            }
            else {
                $(".toolbar").removeClass("toolbar_extend");
            }
        });
    }
    toolbar(); 


//  --------------------- width l-layout and cols ---------- //
    function width_content() {
        var width_layout = $('.l-layout').width();
        var width_left = width_layout * 0.4;
        var width_right = width_layout * 0.6;
        $('.l-col-left').width(width_left);
        $('.l-col-right').width(width_right);
        //$('.l-col-left, .l-col-left .scroller').width(width_topic);
        //$('.l-col-right, .l-col-right .scroller').width(width_content);
        //api.reinitialise();
        //api_content.reinitialise();
    }
    if ($(".l-col-left").length > 0) {
        width_content();
    }

//  --------------- resise(drag) width l-layout and cols -------- //
    //cur_prop = 0.4;
    function column_width() {
        var width_left = $('.l-col-left').width();
        var width_right = $('.l-col-right').width();
        var drag = $('.drag span').position().left;
        var width_layout = $('.l-layout').width();
        var content__width = width_layout - drag;
        //$('.l-col-left, .l-col-left .scroller').width(drag_left);
        //$('.l-col-right, .l-col-right .scroller').width(content__width);
        $('.l-col-left').width(drag);
        $('.l-col-right').width(content__width);
        $('.l-col-left .scroller').width(drag + 17);
        $('.l-col-right .scroller').width(content__width + 17);
        cur_prop = drag/width_layout;
        if (width_right >= 1280) {
              $('.l-col-right').addClass("l-col-right_width");
        }
        else {
              $('.l-col-right').removeClass("l-col-right_width");
        }
    
        if (width_right >= 1280) {
              $('.l-col-right').addClass("l-col-right_width");
        }
        else {
              $('.l-col-right').removeClass("l-col-right_width");
        }
        calendar_width();
        media_cont_width();
    }
    if ($(".l-col-left").length > 0) {
        column_width();
    }
    function resize_proportions(){
        whole = $('.l-layout').width();
        // $('.l-col-left, .l-col-left .scroller').width(whole*cur_prop);
        // $('.l-col-right, .l-col-right .scroller').width(whole*(1-cur_prop));
        $('.l-col-left').width(whole*cur_prop);
        $('.l-col-right').width(whole*(1-cur_prop));
        newValue = whole*cur_prop;
        $('.drag span').css('left', newValue);
        //calendar_width();
    }
    if ($(".drag").length > 0) {
        $('.drag span').draggable({
          axis:'x',
          containment:'parent',
          drag: column_width
        });
    }


// --------------  reinit columns width -------------- //
    $(window).resize(function(event) {
        if ($(".l-col-left").length > 0) {
            resize_proportions();
            column_width();
        }
        if ($(".l-col-right").length > 0) {
            calendar_width();
            media_cont_width();
        }
    });

// -------------- calendar width -------------- //
function calendar_width() {
    var cal_width = $(".js-calendar").outerWidth();
    if (cal_width < 630 && cal_width > 440) {
        $(".js-calendar").addClass("calendar-wrap_middle");
        $(".js-calendar").removeClass("calendar-wrap_small");
    }
    else if (cal_width < 440) {
        $(".js-calendar").removeClass("calendar-wrap_middle");
        $(".js-calendar").addClass("calendar-wrap_small");
    }
    else if (cal_width > 630) {
        $(".js-calendar").removeClass("calendar-wrap_middle");
        $(".js-calendar").removeClass("calendar-wrap_small");
    }
}

// -------------- adaptive width -------------- //
function media_cont_width() {
    var col_width = $(".l-col-right").outerWidth();
    if (col_width < 520) {
        $(".article-nav__left").addClass("is-width");
        $(".article-nav__media").addClass("is-width");
    }
}

if ($(".l-col-right").length > 0) {
    calendar_width();
    media_cont_width();
}
//-------------------- show/hide shadow --------------------- //
    $(".window").children(".scroller-wrap").children(".scroller").scroll(function() {
        // animate shadow 1        
        if (($(this).scrollTop() > 10)) {
            $(".window .article-bar").addClass("is-with-shadow");
        }
        else {
            $(".window .article-bar").removeClass("is-with-shadow");
        }
    });
    $(".content .scroller").scroll(function() {
        // animate shadow 1        
        if (($(this).scrollTop() > 10)) {
            $(".content .article-bar").addClass("is-with-shadow");
        }
        else {
            $(".content .article-bar").removeClass("is-with-shadow");
        }
    });
    // We don't need animation here
    $(".content .article-bar .scroller").scroll(function() {
        // animate shadow 1        
        if (($(this).scrollTop() > 10)) {
            $(".content .article-bar").removeClass("is-with-shadow");
        }
        else {
            $(".content .article-bar").removeClass("is-with-shadow");
        }
    });

//-------------------- show/hide window on click  --------------------- //
    $(".wall li").click(function(){
        var wh = $(window).height();
        var pt = $(this).position().top;
        var h = $(".window").outerHeight();
        var bottom = wh - pt - h;
        $(".window").css({"bottom":bottom});
        $(".window").fadeIn();
        if (wh - pt - h < 0) {
            $(".window").css("bottom", 0);
            $(".window__arr").addClass("is-floating").css({"top":pt});
        }
        else {
            $(".window__arr").removeClass("is-floating").css({"top":21});
        }
        if ($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            hide_window();
        }
        else {
            $(".wall li").removeClass("is-active");
            $(this).addClass("is-active");
        }
        if ($('.js-scroller-5').length > 0) {
            $('.js-scroller-5').baron({barOnCls: 'baron'});
        }
    });
    $(".js-scroller-4 .scroller").scroll(function() {
        // animate shadow 1        
        hide_window();
    });

//-------------------- show/hide window  --------------------- //
    function hide_window() {
        $(".wall li").removeClass("is-active");
        //$(".window").fadeOut();
        //$(".window").css("right", -456);
        $(".window").fadeOut();
        $(".window__arr").removeClass("is-floating").css({"top":21});
        
    }
    hide_window();
    $(".window .icon_close").click(function(){
        hide_window();   
    });


//-------------------- show/hide extend search --------------------- //
    function extend_search() {
        var search = $(".search-ext");
        var search_pos = search.height() + 110; 
        var top = search.height() + 60 + $(".l-col-left .toolbar").height();
        search.css("top", -search_pos);
        $(".js-show-search").click(function(){    
            $(this).hide();
            search.animate({
                top: 0,
                zIndex: 4
            }, 300);
            $(".scroller-wrap__overlay").fadeIn("fast");
            // $(".js-scroller-2").animate({
            //     top: top
            //     }, 300);
            $(".js-scroller-2").animate({
                top: top
            }, 300, function() {
                $(".toolbar .news-top").addClass("news-top_search");
            });
            if ($('.js-scroller-2').length > 0) {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
            }
        });
        $(".js-close-search, .scroller-wrap__overlay").click(function(){
            $(".js-show-search").show();
            search.animate({
                top: -search_pos
            }, 300);
            search.css("z-index", -1);
            $(".js-scroller-2").animate({
                top: 50
                }, 300);
            $(".scroller-wrap_search").animate({
                top: 78
                }, 300);
            $(".js-scroller-2.scroller-wrap_filter-res").animate({
                top: 100
                }, 300);
            $(".scroller-wrap__overlay").fadeOut("fast");
            if ($('.js-scroller-2').length > 0) {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
            }
            $(".toolbar .news-top").removeClass("news-top_search");
        });

    }
    extend_search();


    

// ---------------- Placeholder -------------------------- //
    // add placeholder to all input
    $(".input input").each(function(){
        var placeholder = $(this).attr("placeholder");
        $(this).val(placeholder);
    });
    // remove placeholder from the current input
    $(".input input").focusin(function(){
        if ($(this).hasClass("is-focused")) {}
        else {
            $(this).addClass("is-focused");
            $(this).val("");
        }
    });
    // remove placeholder from the current input
    $(".input input").focusout(function(){
        var placeholder = $(this).attr("placeholder");
        if ($(this).val() != "") {}
        else {
            $(this).val(placeholder);
            $(this).removeClass("is-focused");
        }
    });

    function popup_height() {
        var popup_height = $(".js-popup-create").outerHeight();
        var window_height = $(window).height();
        if (popup_height > window_height) {
            $(".js-popup-create").height(window_height - 100);
            if ($('.js-scroller-popup').length > 0) {
                $('.js-scroller-popup').baron({barOnCls: 'baron'});
            }
            if ($('.js-scroller-var').length > 0) {
                $('.js-scroller-var').baron({barOnCls: 'baron'});
            }
        }
        else {

        }
    }
    popup_height();
    $(window).resize(function(){
        popup_height();
    });


    var to = new Date();
    var from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 14);

    $('.js-datepicker').each(function(){
        var date_from = $(this).parent().find(".js-date-from");
        var date_to = $(this).parent().find(".js-date-to");
        $(this).DatePicker({
            inline: true,
            //date: [from, to],
            calendars: 2,
            mode: 'range',
            current: new Date(to.getFullYear(), to.getMonth(), 1),
            onChange: function(dates,el) {
            // update the range display
            date_from.addClass("is-focused");
            date_to.addClass("is-focused");
            date_from.val(
              dates[0].getDate()+' '+dates[0].getMonthName(true)+', '+
              dates[0].getFullYear()
            );
            date_to.val(
              dates[1].getDate()+' '+dates[1].getMonthName(true)+', '+
              dates[1].getFullYear()
            );
          }
        });
    });
    


});

