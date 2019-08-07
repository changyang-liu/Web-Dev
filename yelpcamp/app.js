var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');


//Express config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

//Mongoose config
mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser: true});

//HOME
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res){
    Campground.create(req.body.campground, function(err, newCamp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds")
        }
    });
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    Campground.findOne({_id: req.params.id}, function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCamp});
        }
    });
});

app.listen(3000);