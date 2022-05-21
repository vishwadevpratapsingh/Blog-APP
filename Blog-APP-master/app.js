//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "This is a blog website , share your posts !";
const homeaboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect('mongodb://localhost:27017/blogDB');

const PostSchema = {
  title:String,
  content:String
};

const Post = mongoose.model("Post",PostSchema);

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//home-route
app.get("/",function(req,res){

  Post.find({},function(err,foundItems){
    if(foundItems.length===0){
      const firstpost= new Post({
        title : "fp",
        content:homeStartingContent 
      });
      firstpost.save();
      res.render("home" , {Posts:foundItems});
    }
    else
    {
      res.render("home" , {Posts:foundItems});
    }
  });
  
});

//about-route
app.get("/about",function(req,res){
  res.render("about" , {about:homeaboutContent});
});

//contact-route
app.get("/contact",function(req,res){
  res.render("contact" , {contact:contactContent});
});

//compose-route
app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:id",function(req,res){
  // console.log(req.params.title);
const ID = req.params.id;
Post.findOne({_id:ID},function(err,foundItem){
  if(!err){
    res.render("post",{requestedPost:foundItem});
  }

});
  
});

//posting-from-commpose-page
app.post("/compose",function(req,res){
const post = new Post({
  title:req.body.posttitle,
  content:req.body.postcontent
});
post.save();

res.redirect("/");
});








app.listen(process.env.PORT || 3000,function(){
  console.log("Listening!");
});
