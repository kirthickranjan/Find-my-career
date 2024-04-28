const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
var bodyParser = require('body-parser')
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const isAuth = require("./middleware/isAuth");

const postrouter = require("./routes/postRoutes")
const careerrouter = require("./routes/careerRoutes")
const userrouter = require("./routes/userRoutes")


app.use(bodyParser.json());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({
   extended: true
}));


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// 1st middleware
app.use(morgan("dev"))

app.use(express.json());   // middleware - a function that process the the incomming request 

app.use((req, res, next)=>{
    console.log("hello from middleware");
    next();
} )

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

const mongoURI = "mongodb://localhost:27017/fmc";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res)=>{
    console.log("mongoDB connected");
  })


const store = new MongoDBSession({
    uri : mongoURI,
    collections : "mySessions"
})  


app.use(session({
    secret : "key that will sign a cookie",
    resave : false,
    saveUninitialized : false,
    store : store
}))



app.use("/api/v1/user" , userrouter)

app.use("/api/v1/post" ,isAuth, postrouter)

app.use("/api/v1/career" , careerrouter)


app.listen(4000 , ()=>{
    console.log("server running on port 4000");
})






































// router
//     .route("api/v1/projects")
//     .get(getProjects)
// router
//     .route("api/v1//project/:x")
//     .get(getProject)
// app.use("/api/v1/post" , postrouter)

// app.use("/api/v1/career" , careerrouter)




// var bodyParser=require("body-parser");

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/');
// var db=mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback){
//    console.log("connection succeeded");
// })


// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({
//     extended: true
//  }));

//  app.post('/sign_up', function(req,res){
//     var name = req.body.username;
//     var email =req.body.email;
//     var state =req.body.state;
//     var city = req.body.city;
//     var password = req.body.password;
 
//     var data = {
//        "username": name,
//        "email":email,
//        "state":state,
//        "city":city,
//        "password":password
//     }
//     db.collection('details').insertOne(data,function(err, collection){
//     if (err) throw err;
//        console.log("Record inserted Successfully");
//     });
    
//  })
 
//  app.get('/api/v1/user/login/signup',function(req,res){
    
//     res.sendFile(path.join(__dirname+'./public/signup.html'));
//  })