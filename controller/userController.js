const path = require('path');
const UserModel = require("./../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


exports.login = (req,res) =>{

   // if(req.session.isAuth){
   //    return res.redirect("http://127.0.0.1:4000/api/v1/user/profile");
   // }
    return res.render(`login`)
}

exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        
    })
    res.render("login");
}

exports.postLogin = async (req,res) =>{
   const {email , password} = req.body;

    const user = await UserModel.findOne({email});

    if (!user){
      console.log("err");
        return res.render('login')
        
    }
    const isMatch =await bcrypt.compare(password , user.password);
    if(!isMatch){
      console.log("err");
        return res.render("login")
    }

    req.session.isAuth = true;
    //res.redirect("/dashboard");
   // return res.redirect(__dirname+'/../public/index.html');
   return res.redirect('/api/v1/post');
   
}

exports.getSignup = (req,res) =>{
    return res.render("signup")
    
}

exports.postSignup = async(req,res) =>{
  
   const {username , email ,state, city, password } = req.body;
    let user = await UserModel.findOne({email});
    if (user){
        return res.redirect("/register");
    }

    const hashPsw =await bcrypt.hash(password,12);

    user = new UserModel({
        username,
        email,
        state,
        city,
        password:hashPsw
    });
    user.save();
    console.log("saved");

    //welcome email pa
    res.redirect("http://127.0.0.1:4000/api/v1/user/login");
   
}

exports.getProfile = (req,res) =>{
    return res.render("profile")
}

exports.updateProfile = (req,res) =>{
    return res.render("profile")
}


