
    function stickyTitles(stickies) {

        this.load = function() {
            $('.js-scroller-2').baron({barOnCls: 'baron'});
            stickies.each(function(){
                var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
                    thisSticky.parent().height(thisSticky.outerHeight());
                jQuery.data(thisSticky[0], 'pos', thisSticky.position().top);
            });
        }

        this.scroll = function() {
            stickies.each(function(i){                
                var thisSticky = jQuery(this),
                    nextSticky = stickies.eq(i+1),
                    prevSticky = stickies.eq(i-1),
                    pos = jQuery.data(thisSticky[0], 'pos');
                    $(".search input").val(pos);
                    
                if (pos <= jQuery(".js-scroller-2 .scroller").scrollTop()) {
                    var pos_parent = $(".js-scroller-2 .scroller__container").position().top;
                    thisSticky.addClass("fixed");
                    if (Math.abs(pos_parent) >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
                        thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - Math.abs(pos_parent) - thisSticky.outerHeight());
                    }
                } 
                else {
                    thisSticky.removeClass("fixed");
                    if (prevSticky.length > 0 && jQuery(".js-scroller-2 .scroller").scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
                        prevSticky.removeClass("absolute").removeAttr("style");
                    }
                }

            });         
        }
    }
    jQuery(document).ready(function(){
        //var newStickies = new stickyTitles(jQuery(".news-top"));
        //newStickies.load(); 
        //$('.js-scroller-2').baron({barOnCls: 'baron'});
        // jQuery(".js-scroller-2 .scroller").on("scroll", function() {
        //     newStickies.scroll();
        // });
        if ($(".js-scroller-2 .scroller").length > 0) {
            var newStickies = new stickyTitles(jQuery(".news-top"));
            newStickies.load(); 
            jQuery(".js-scroller-2 .scroller").on("scroll", function() {
                newStickies.scroll();
            });
        }
    });

// $(document).ready(function(){
//     $(".followMeBar").each(function(){
//         var thisSticky = $(this).wrap('<div class="followWrap" />');
//         var height = thisSticky.parent().height(thisSticky.outerHeight());
//         jQuery.data(thisSticky[0], 'pos', thisSticky.position().top);
//     });
// });



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
    baron.u();
}

$(document).ready(function() {

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

// ------------------- Popup  ------------------- //
    $(".email").click(function(){
        if($(this).hasClass("js-active")) {
            $(this).removeClass("js-active");
            $(".popup-send").fadeOut("fast");
            $(".overlay-popup").fadeOut()
        }
        else {
            $(this).addClass("js-active");
            $(".popup-send").fadeIn("fast");
            $(".overlay-popup").fadeIn()
        }
    });

    $(".overlay-popup, .popup-close").click(function(){
        $(".popup-send").fadeOut();
        $(".overlay-popup").fadeOut();
        $(".email").removeClass("js-active");
    });

// ------------------- View type ------------------- //
    $(".js-btn-opt").click(function(){
        var overlay = $(this).parent().parent().parent().children(".toolbar__overlay");
        var list = $(this).parent().children(".js-drop-down");
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            list.slideUp("fast");
            overlay.hide()
        }
        else {
            $(this).addClass("is-active");
            list.slideDown("fast");
            overlay.show()
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
    });


//-------------------- show/hide shadow --------------------- //
    $(".window .scroller").scroll(function() {
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

//-------------------- show/hide window on click  --------------------- //
    $(".wall li").click(function(){
        var wh = $(window).height();
        var pt = $(this).position().top;
        var h = $(".window").height() + 51;
        var bottom = wh - pt - h;
        $(".window").css({"bottom":bottom, "right":210});
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
    });
    $(".js-scroller-4 .scroller").scroll(function() {
        // animate shadow 1        
        hide_window();
    });

//-------------------- show/hide window  --------------------- //
    function hide_window() {
        $(".wall li").removeClass("is-active");
        $(".window").css("right", -456);
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
                zIndex: 3
            }, 300);
            $(".scroller-wrap__overlay").fadeIn("fast");
            $(".js-scroller-2").animate({
                top: top
                }, 300);
            if ($('.js-scroller-2').length > 0) {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
            }
        });
        $(".js-close-search").click(function(){
            $(".js-show-search").show();
            search.animate({
                top: -search_pos
            }, 300);
            search.css("z-index", -1);
            $(".js-scroller-2").animate({
                top: 50
                }, 300);
            $(".js-scroller-2.scroller-wrap_filter-res").animate({
                top: 100
                }, 300);
            $(".scroller-wrap__overlay").fadeOut("fast");
            if ($('.js-scroller-2').length > 0) {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
            }
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


});

