var bodyParser = require("body-parser"),
methodOverride = require("method-override")
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//app config
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))

//mongodb config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.redirect("/blogs");
});

//index route
app.get("/blogs", function(req, res){
    Blog.find({}).sort({created: -1}).exec(function(err, blogs){
        if(err){
            console.log("Error loading blogs from database");
        }else{
            console.log("Blogs loaded successfully")
            res.render("index", {blogs:blogs});
        }
    });
});

//new route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//create route
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, blogPost){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

//show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogPost){
        if(err){
            console.log(err);
            //res.redirect("/blogs");
        }else{
            res.render("show", {blog: blogPost});
        }
    });
});

//edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blogPost){
        if(err){
            console.log(err);
        }else{
            res.render("edit", {blog:blogPost});
        }
    });
});

//update route
app.put("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogPost){
        if(err){
            console.log(err);
            console.log("Error in find by id")
        }else{
            blogPost.set(req.body.blog);
            blogPost.save(function(err, updatedBlog){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/blogs/" + req.params.id);
                    console.log("Error in save")
                }
            })
            
        }
    });
});

app.listen(3000);

