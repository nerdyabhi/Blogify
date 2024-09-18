const express = require('express');
const blogModel = require("../models/blogs");
const asyncHandler = require('express-async-handler');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const renderBlogPage = (req , res)=>{
    const user = req.body.user;
    res.render("createBlog" , {user:user});
} 

const postBlogHandler = asyncHandler(async(req, res)=>{
    const {title , body} = req.body;
    const newBlog = await blogModel.create({
        title:title,
        body:body,
        coverImageURL:`./images/uploads/${req.file.filename}`,
        createdBy:req.user._id,
    }) 

    console.log(newBlog);
    
    res.redirect("/");
})

module.exports ={
    renderBlogPage, 
    postBlogHandler,
}   