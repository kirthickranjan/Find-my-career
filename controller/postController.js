const path = require('path');
const Post = require("./../models/post");

exports.getPosts = (req,res) =>{
    

  Post.find({}, function(err, post){
    if(err){
        console.log('Error in fetching tasks from db');
        return;
    }

    return res.render('index', {
        
        post : post
    });
})
    
    //res.end("hello you are in landing page")
}

exports.getCreatePost = (req,res) =>{
      res.render("create_post")
      //res.sendFile(
      //path.join(__dirname+'/../views/create_post.html'));
}

exports.createPost = (req,res) =>{


    const post = new Post(req.body);
    post.save()
    .then(result => {
      res.redirect('http://127.0.0.1:4000/api/v1/post');
    })
    .catch(err => {
      console.log(err);
    });
    // return res.redirect(__dirname+'/../public/index.html');
    //return res.redirect('http://127.0.0.1:4000/api/v1/post');


}