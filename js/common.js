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