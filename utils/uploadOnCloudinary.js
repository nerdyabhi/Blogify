const fs = require('fs');
const cloudinary = require('cloudinary').v2;
let CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
let CLOUDINARY_API_KEY = process.env.API_KEY;
let CLOUDINARY_API_SECRET = process.env.API_SECRET;
const uploadOnCloudinary = async (fileBuffer, originalname) => {
    try {
      if (!fileBuffer) return null;
  
      const response = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
  
        uploadStream.end(fileBuffer);
      });
  
      console.log("File is uploaded on ", response.url);
      return response;
    } catch (err) {
      console.log("Something went wrong while uploading file", err);
    }
  };



cloudinary.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
})

module.exports = uploadOnCloudinary;
