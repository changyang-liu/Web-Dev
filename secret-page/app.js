
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("./models/user");


//Mongoose config
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

//Express config
var app = express();
app.set("view engine", "ejs");
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: "mypassword",
    resave: false,
    saveUninitialized: false
}));

//Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==================ROUTES=======================

//Root route
app.get("/", function(req, res){
    res.render("home");
});

//Secret Route
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//Show Register Page
app.get("/register", function(req, res){
    res.render("register");
});

//User Create Route
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

//Show Login Page
app.get("/login", function(req, res){
    res.render("login");
});

//Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
})

//User Login Route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
    failureFlash: true
}), function(req, res){})


//=================Middleware=======================
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000);