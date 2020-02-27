$(function() {
    function checkEmpty(){
        let liToEat = $(".liToEat");
        let liAte = $(".liAte");

        if(liToEat.length) {$(".left-div ul h3").text("Ready to Eat..")}
        else {$(".left-div ul h3").text("Add some burgers to Enjoy...")}
        
        if(liAte.length) {$(".right-div ul h3").text("Woww..You are doing great!")}
        else {$(".right-div ul h3").text("Hungry!!!")}
    }

    $(".create-form").on("submit", function(event){
        event.preventDefault()
        
        if($("#burgName").val()){
            let re = /(\b[a-z](?!\s))/g;
            let burgName = $("#burgName").val().trim()
            burgName = burgName.replace(re, (x) => {return x.toUpperCase()})
            
            let newBurger = {
                burgerName: burgName
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
        let id = $(this).data("id")
        let devoured = !($(this).data("devour"))

        let newDevoured = {
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
        let id = $(this).data("id")
        let reply = confirm("Are you sure about removing " + $(this).data("name") + " from the list and Database?");
        
        if(reply){
            $.ajax("api/burgers/" + id,{
                type: "DELETE",
            }).then(
                function(){
                    console.log("deleted the burger ", id)
                    location.reload()
                }
            )
        }
    })
    checkEmpty()
})

