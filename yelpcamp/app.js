var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Express config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

//MongoDB Config
mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser: true});

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res){
    var newCamp = new Campground(req.body.campground);
    Campground.create(req.body.Campground, function(err, newCamp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds")
        }
    });
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    Campground.find(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground = foundCamp});
        }
    });
});

app.listen(3000);