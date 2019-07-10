var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var friends = ["a", "b", "c", "d", "e"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home");
})

app.post("/addFriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
})

app.get("/*", function(req, res){
    res.send("Sorry, page not found");
})

app.listen(3000, function(){
    console.log("server started");
});