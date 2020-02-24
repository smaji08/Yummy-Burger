var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res){
    burger.all(function(data){
        var hbsObject = {Burgers: data}
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
})

router.post("/api/burgers", function(req,res){
    console.log("controller " + req.body.burgerName)
    burger.create(["burger_name"],[req.body.burgerName],
        function(result){
            res.json({id: result.insertId})
    })
})

router.put("/api/burgers/:id", function(req, res){
    console.log("in controller  "+ req.body.devouredVal);
    var condition = "id = " + req.params.id
    console.log(condition);
    burger.update({devoured: req.body.devouredVal},condition,
        function(result){
            if(result.changedRows == 0) return res.status(404).end()
            return res.status(200).end()
        })
})

router.delete("/api/burgers/:id", function(req,res){
    var condition = "id = " + req.params.id
    console.log(condition);
    burger.delete(condition, function(result){
        if(result.affectedRows == 0) return res.status(404).end()
        return res.status(200).end()
    })
})
module.exports = router;