$(document).ready(function() {

// ------------------- View type ------------------- //
    $(".js-view-type, .js-add-to").click(function(){
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

// ------------------- View type ------------------- //
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
            });5
        }
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