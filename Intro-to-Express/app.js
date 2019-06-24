var express = require("express");
var app = express();

app.get("/", function(req, res){
     res.send("Hi there I'm bobbert");
})

app.get("/bye", function(req, res){
    res.send("byeefsfe");
})

app.get("/a", function(req, res){
    res.send("sent");
})

app.listen(3000, function(){
    console.log("Server started");
})