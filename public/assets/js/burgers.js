$(function() {
    var liToEat = $(".liToEat");

    if(liToEat.length) {$(".left-div ul h3").text("Ready to Eat..")}
    else {$(".left-div ul h3").text("Add some burgers to Enjoy...")}
    
    var liAte = $(".liAte");

    if(liAte.length) {$(".right-div ul h3").text("Woww..You are doing great!")}
    else {$(".right-div ul h3").text("Hungry!!!")}
    
    $(".create-form").on("submit", function(event){
        event.preventDefault()
        
        if($("#burgName").val()){
            var newBurger = {
                burgerName: $("#burgName").val().trim()
            }
            
            $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
            }).then(
                function(){
                    console.log("New burger added")
                    location.reload()
                }
            )
        }
    })

    $(".eatNoeat").on("click", function(event){
        var id = $(this).data("id")
        var devoured = !($(this).data("devour"))

        var newDevoured = {
            devouredVal: devoured
        }
        
        $.ajax("api/burgers/" + id,{
            type: "PUT",
            data: newDevoured
        }).then(
            function(){
                console.log("Burger devoured to", devoured)
                location.reload()
            }
        )
    })

    $(".delete").on("click", function(event){
        var id = $(this).data("id")
        
        $.ajax("api/burgers/" + id,{
            type: "DELETE",
        }).then(
            function(){
                console.log("deleted the burger ", id)
                location.reload()
            }
        )
    })
})