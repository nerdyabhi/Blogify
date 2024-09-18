const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const userModel = require("../models/user");
const user = require('../models/user');
const blogModel = require('../models/blogs');
const {createTokenForUser , validateToken} = require('../utils/auth');
const blogsModel = require('../models/blogs');

// render Home Page
// Public 
// GET : http://localhost:3000/
const renderHomePage = async(req, res)=>{

    // const data= validateToken();
    const token = req.cookies.authToken;
    if(!token) res.render("signin" , {error:"You're not logged in, kindly login"});
    const userData = validateToken(token);
    const blogsData = await blogModel.find({});
    res.render("home" , {user:userData , blogs:blogsData});
}

// render Signup Page
// Public 
// GET : http://localhost:3000/signup
const renderSignupPage = (req, res)=>{
    res.render("signup" , {alreadyUser:false});
}

// render Signin Page
// Public 
// GET : http://localhost:3000/signin
const renderSigninPage = (req, res)=>{
    res.render("signin" , {error:false});
}

// Register User
// Public 
// POST : http://localhost:3000/signin
const userSignupHandler  = asyncHandler(async(req , res)=>{

    const {fullName , email , password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const alreadyUser = await userModel.findOne({email:email});
    if(alreadyUser) res.render("signup" , {alreadyUser:true});

    const newUser = await userModel.create({
        fullName:fullName,
        email:email,
        password:hashedPassword,
        role:"USER",
    })

    res.render("Home" , {user:newUser});
})


// Login User
// Public 
// POST : http://localhost:3000/signin
const userSigninHandler  = asyncHandler(async(req , res)=>{
    const { email , password} = req.body;
    
    const user = await userModel.findOne({email:email});
    if(!user) res.render("signin" , {error:"Wrong Pass or email"});
    
    const passMatch = await bcrypt.compare(password,user.password );

    if(!passMatch) res.render("signin" , {error:"Wrong Pass or email"});
    const token = createTokenForUser(user);
    const blogData = await blogsModel.find({});
    res.cookie("authToken", token).render("Home" , {user:user , blogs:blogData});
})

const userLogoutHandler = asyncHandler(async(req, res)=>{
    res.cookie("authToken" , "");
    res.redirect("/signin");
})


module.exports = { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler};