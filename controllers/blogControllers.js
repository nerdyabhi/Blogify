const express = require('express');
const blogModel = require("../models/blogs");
const asyncHandler = require('express-async-handler');
const uploadOnCloudinary = require('../utils/uploadOnCloudinary');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const renderBlogPage = (req , res)=>{
    const user = req.body.user;
    res.render("createBlog" , {user:user});
} 

const postBlogHandler = asyncHandler(async(req, res)=>{
    const {title , body} = req.body;
    let coverImageURL = `./images/uploads/${req.file.filename}`;
    

    try {
        const fileResponse = await uploadOnCloudinary(req.file.path);
        coverImageURL = fileResponse.url;
        console.log("CoverImage Url value is : " , coverImageURL);
        
        const newBlog = await blogModel.create({
            title:title,
            body:body,
            coverImageURL:coverImageURL,
            createdBy:req.user._id,
        }) 

    } catch (error) {
        console.log("Some error happend on our side: ");
        
    }
    

    
    res.redirect("/");
})

const renderSinglePageBlog = asyncHandler(async(req, res)=>{
    const id = req.params.id;

    try {
        const blogData = await blogModel.find({_id:id});
        console.log(blogData);
        
        if(!blogData) res.send("404");
        res.render("blog" , {blog:blogData[0]});
    } catch (error) {
        res.render("404");
    }
        
})

module.exports ={
    renderBlogPage, 
    postBlogHandler,
    renderSinglePageBlog,
}   