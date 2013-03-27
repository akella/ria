$(document).ready(function() {

// ------------------- Fancybox ----------------------// 
    $(".media-link").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        padding: 20,
        // afterLoad   : function() {
        //     this.inner.apppend( '<a href="#" class="popup__download"><i></i>Скачать</a>' );
        // },
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
    $(".js-view-type, .js-add-to").click(function(){
        var list = $(this).parent().children(".js-drop-down");
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            list.slideUp("fast");
            $(".toolbar__overlay").hide()
        }
        else {
            $(this).addClass("is-active");
            list.slideDown("fast");
            $(".toolbar__overlay").show()
        }
    });
    // Click on toolbar__overlay
    $(".toolbar__overlay").click(function(){
        $(this).fadeOut();
        $(".js-view-type").removeClass("is-active");
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
                $(".l-sidebar").css("z-index", "1");
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

// ------------------- Show wall ------------------- //
    $(".js-show-wall").click(function(){
        if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $("body").removeClass("is-withwall");
            $(".l-wall-news").removeClass("is-active").afterTransition(function () {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
                $('.js-scroller-3').baron({barOnCls: 'baron'});
            });
        }
        else {
            $(this).addClass("is-active");
            $("body").addClass("is-withwall");
            $(".l-wall-news").addClass("is-active").afterTransition(function () {
                $('.js-scroller-2').baron({barOnCls: 'baron'});
                $('.js-scroller-3').baron({barOnCls: 'baron'});
            });
        }
        // reinit columns with dragable
        resize_proportions();
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
    function width_topic_content() {
        var width_page_right = $('.l-layout').width();
        var width_topic = width_page_right * 0.4;
        var width_content = width_page_right * 0.6;
        $('.l-col-left, .l-col-left .scroller').width(width_topic);
        $('.l-col-right, .l-col-right .scroller').width(width_content);
        //api.reinitialise();
        //api_content.reinitialise();
    }
    width_topic_content();

//  --------------- resise(drag) width l-layout and cols -------- //
    cur_prop = 0.4;
    function column_width() {
      var topic_width = $('.l-col-left').width();
      var drag_left = $('.drag span').position().left;
      var page_width = $('.l-layout').width();
      var content__width = page_width - drag_left;
      $('.l-col-left, .l-col-left .scroller').width(drag_left);
      $('.l-col-right, .l-col-right .scroller').width(content__width);
      cur_prop = drag_left/page_width;
    }
    column_width();
    function resize_proportions(){
        whole = $('.l-layout').width();
        $('.l-col-left, .l-col-left .scroller').width(whole*cur_prop);
        $('.l-col-right, .l-col-right .scroller').width(whole*(1-cur_prop));
        newValue = whole*cur_prop;
        $('.drag span').css('left', newValue);
    }
    $('.drag span').draggable({
      axis:'x',
      containment:'parent',
      drag: column_width,
    });


// --------------  reinit columns width -------------- //
    $(window).resize(function(event) {
        resize_proportions();
        column_width();
        //$('.js-scroller-1').baron({barOnCls: 'baron'});
        //$('.js-scroller-2').baron({barOnCls: 'baron'});
        //$('.js-scroller-3').baron({barOnCls: 'baron'});
        //$('.js-scroller-4').baron({barOnCls: 'baron'});
    });


    // $(".toolbar, .article-bar").hover(
    //   function () {
    //     $(this).parent().css("z-index", "4");
    //   },
    //   function () {
    //     $(this).parent().css("z-index", "2");
    //   }
    // );




});

// ------------------- Buron scroller ------------------- //
window.onload = function() {
    baron($('.js-scroller-1'), {
        scroller: '.scroller',
        container: '.scroller__container',
        bar: '.scroller__bar span',
        barOnCls: 'baron'
    });
    $('.js-scroller-2').baron({
        barOnCls: 'baron',
        header: '.js-scroller-head',
        // CSS class for fixed headers
        hFixCls: 'news-top__fixed',
        // CSS class for lowest fixed header of top headers group
        hBeforeFixCls: 'news-top__position-top',
        // !!! Remaned from hTopFixCls
        // CSS class for uppermost fixed header of bottom headers group
        hAfterFixCls: 'news-top__position-bottom'

    });
    $('.js-scroller-3').baron({barOnCls: 'baron'});
    $('.js-scroller-4').baron({barOnCls: 'baron'});
};




// function stickyTitles(stickies) {

//     this.load = function() {

//               stickies.each(function(){
                
//                     var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
//                         thisSticky.parent().height(thisSticky.outerHeight());
                
//                     jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);

//               });
//         }
            
//         this.scroll = function() {
        
//               stickies.each(function(i){                
                
//                     var thisSticky = jQuery(this),
//                           nextSticky = stickies.eq(i+1),
//                           prevSticky = stickies.eq(i-1),
//                           pos = jQuery.data(thisSticky[0], 'pos');
            
//                     if (pos <= jQuery(window).scrollTop()) {
                    
//                           thisSticky.addClass("fixed");
                    
//                           if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
                        
//                                 thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());

//                           }
                    
//                     } else {
                    
//                           thisSticky.removeClass("fixed");
                    
//                           if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
                    
//                                 prevSticky.removeClass("absolute").removeAttr("style");
                    
//                           }
                    
//                     }
//             });         
//     }
// }
    
// jQuery(document).ready(function(){
    
//         var newStickies = new stickyTitles(jQuery(".followMeBar"));
        
//         newStickies.load();
            
//         jQuery(window).on("scroll", function() {

//               newStickies.scroll();
        
//         });
// });