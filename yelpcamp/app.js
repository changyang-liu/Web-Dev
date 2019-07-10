var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
    {
        name: "Salmon creek",
        image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Granite hill",
        image: "https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Mountain goat's rest",
        image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9044c05e_340.jpg"
    },
    {
        name: "Salmon creek",
        image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Granite hill",
        image: "https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Mountain goat's rest",
        image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9044c05e_340.jpg"
    },
    {
        name: "Salmon creek",
        image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Granite hill",
        image: "https://pixabay.com/get/57e8d1464d53a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9048c05e_340.jpg"
    },
    {
        name: "Mountain goat's rest",
        image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732d7ddd9044c05e_340.jpg"
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
})

app.post("/campgrounds", function(req, res){
    var newCamp = {
        name: req.body.name,
        image: req.body.image
    };
    campgrounds.push(newCamp);
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(3000);