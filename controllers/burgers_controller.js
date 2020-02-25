var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res){
    burger.all(function(data){
        var hbsObject = {Burgers: data}
        
        res.render("index", hbsObject)
    })
})

router.post("/api/burgers", function(req,res){
    
    burger.create(["burger_name"],[req.body.burgerName],
        function(result){
            res.json({id: result.insertId})
    })
})

router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id

    burger.update({devoured: req.body.devouredVal},condition,
        function(result){
            if(result.changedRows == 0) return res.status(404).end()
            return res.status(200).end()
        })
})

router.delete("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id
    
    burger.delete(condition, 
        function(result){
            if(result.affectedRows == 0) return res.status(404).end()
            return res.status(200).end()
    })
})

module.exports = router;