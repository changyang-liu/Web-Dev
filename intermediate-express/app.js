var express = require('express');
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
})

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal;
    if(animal === "pig"){
        res.send("The pig says 'Oink'");
    }else if(animal === "cow"){
        res.send("The cow says 'Moo'");
    }else if(animal === "dog"){
        res.send("The dog says 'Woof'");
    }
    res.send("Sorry, page not found");
})

app.get("/repeat/:word/:times", function(req, res){
    var times = parseInt(req.params.times, 10);
    var phrase = "";
    for(var i = 0; i < times; i++){
        console.log(i)
        phrase += req.params.word + " ";
    }
    console.log(phrase);
    res.send(phrase);
})

app.get("/*", function(req, res){
    res.send("Sorry, page not found");
})

app.listen(3000, function(){
    console.log("console started");
});