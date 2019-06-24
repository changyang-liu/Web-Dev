$("ul").on("click", "li", function(){
    $(this).toggleClass("completed")
})

$("ul").on("click", "span", function(event){
    $(this).parent("li").fadeOut(300, function(){
        $(this).remove();
    })
    event.stopPropagation();
})

$("input").keypress(function(k){
    if(k.which === 13){
        var item = $("#input").val();
        $(this).val("")
        $("#list").append("<li> <span><i class='fa fa-trash'></i></span> " + item + "</li>");
    }
})

$(".fa-plus").on("click", function(){
    $("#input").fadeToggle(150);
})

if($("#list li").length === 0){
    $("#input").css("display", "inline-block")
}