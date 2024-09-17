const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const userModel = require("../models/user");
const user = require('../models/user');
const {createTokenForUser , validateToken} = require('../utils/auth');

// render Home Page
// Public 
// GET : http://localhost:3000/
const renderHomePage = (req, res)=>{

    // const data= validateToken();
    const token = req.cookies.authToken;
    if(!token) res.render("signin" , {error:"You're not logged in, kindly login"});
    const userData = validateToken(token);
    
    res.render("home" , {fullName :userData.fullName});
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

    res.render("Home" , {fullName:newUser.fullName});
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
    res.cookie("authToken", token).render("Home" , {fullName:user.fullName});
})

const userLogoutHandler = asyncHandler(async(req, res)=>{
    res.cookie("authToken" , "");
    res.redirect("/signin");
})


module.exports = { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler};