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
        default:"../public/images/defaultAvatar.png"
    },
     
    role:{
        type:String,
        required:true,
        enum:[ "USER" , "ADMIN" ],
    },


} , {timestamps:true})

module.exports = mongoose.model("User" ,userSchema);