const express = require('express');
const blogModel = require("../models/blogs");
const asyncHandler = require('express-async-handler');
const blogs = require('../models/blogs');


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