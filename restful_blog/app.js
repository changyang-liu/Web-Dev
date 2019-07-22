var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//app config
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//mongodb config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Test blog",
    image: "https://images.unsplash.com/photo-1563729950602-4c24322b6b34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    body: "This is a testing blog post"
});

