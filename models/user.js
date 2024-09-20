const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true
    },

    profileImageUrl:{
        type:String,
        default:"https://res.cloudinary.com/dvanwo7dv/image/upload/v1726784461/wqvdjxlslbfgmbmcyj3d.jpg"
    },
     
    role:{
        type:String,
        required:true,
        enum:[ "USER" , "ADMIN" ],
    },


} , {timestamps:true})

module.exports = mongoose.model("User" ,userSchema);