var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seed');


//Express config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

//Mongoose config
mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser: true});
//seedDB();

//HOME
app.get("/", function(req, res){
    res.render("landing");
});


//===========================
//CAMPGROUNDS ROUTES
//===========================

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
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
    Campground.findById(req.params.id).populate({path:"comments", model:Comment}).exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

//===========================
//COMMENTS ROUTES
//===========================

//NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log(campground);
            console.log(req.params.id);
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

app.listen(3000);