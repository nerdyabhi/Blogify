const fs = require('fs');
const cloudinary = require('cloudinary').v2;
let CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
let CLOUDINARY_API_KEY = process.env.API_KEY;
let CLOUDINARY_API_SECRET = process.env.API_SECRET;
const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        // upload file on cloudinary

       const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        }) 
        console.log("File is uploaded on ", response.url);
        fs.unlinkSync(localFilePath); // removing file after successfully uploading it?
        return response;
        
        // file has been uploaded successfully.
    }
    catch(err){
        console.log("Something went wrong while uploading file" , err);
        
    }
}




cloudinary.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
})

module.exports = uploadOnCloudinary;
