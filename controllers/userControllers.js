const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const userModel = require("../models/user");
const user = require('../models/user');
const blogModel = require('../models/blogs');
const {createTokenForUser , validateToken} = require('../utils/auth');
const blogsModel = require('../models/blogs');
const uploadOnCloudinary = require('../utils/uploadOnCloudinary');

// render Home Page
// Public 
// GET : http://localhost:3000/
const renderHomePage = async(req, res)=>{

    // const data= validateToken();
    const token = req.cookies.authToken;
    if(!token) return res.render("signin" , {error:"You're not logged in, kindly login"});
    console.log("Token is present*");
    
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
    res.render("signin" , {error:""});
}

// Register User
// Public 
// POST : http://localhost:3000/signin
const userSignupHandler  = asyncHandler(async(req , res)=>{
    console.log(req.body);
    const {fullName , email , password} = req.body;
    const alreadyUser = await userModel.findOne({email:email});
    if(alreadyUser) res.render("signup" , {alreadyUser:true});

    let profileImage = await uploadOnCloudinary(req.file.buffer , req.file.originalname);

    const profileImageUrl = profileImage.url || "https://res.cloudinary.com/dvanwo7dv/image/upload/v1726784461/wqvdjxlslbfgmbmcyj3d.jpg";

    
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(profileImageUrl);
    
    const newUser = await userModel.create({
        fullName:fullName,
        email:email,
        password:hashedPassword,
        profileImageUrl:profileImageUrl,
        role:"USER",
    })
    const token = createTokenForUser(newUser);
   
    const blogData = await blogModel.find({});
    res.cookie("authToken" , token).render("home" , {user:newUser , blogs:blogData});
})


// Login User
// Public 
// POST : http://localhost:3000/signin
const userSigninHandler  = asyncHandler(async(req , res)=>{
    const { email , password} = req.body;
    console.log("Reached signin Handler.");
    
    const user = await userModel.findOne({email:email});
    if(!user) res.render("signin" , {error:"Wrong Pass or email"});
    
    const passMatch = await bcrypt.compare(password,user.password );
    
    if(!passMatch) res.render("signin" , {error:"Wrong Pass or email"});
    try {
        const blogData = await blogsModel.find({});
        const token = createTokenForUser(user);
        return res.cookie("authToken", token).render("home" , {user:user , blogs:blogData});
    } catch (error) {
        console.log("Error hogaya yeah toh " , error);
        res.send("error aagaya sir");
    }
})

const userLogoutHandler = asyncHandler(async(req, res)=>{
    res.cookie("authToken" , "");
    res.redirect("/signin");
})

const renderUserProfile = asyncHandler(async(req ,res)=>{
    const token = req.cookies.authToken;
    if(!token) res.render("signin" , {error:"Login to check profile"});

    const payload = validateToken(token);
    const blogData = await blogModel.find({createdBy:payload._id});
    console.log(blogData);
    res.render("profile" , {user:payload , blogs:blogData});
})


module.exports = { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler , renderUserProfile};