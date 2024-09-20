const mongoose = require('mongoose');
require("dotenv").config();
const url = process.env.MONGO_DB_URL;

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(url);
        console.log("Successfully Connected to MONGODB");
        
    } catch (error) {
        console.log("Failed connecting to database");
        console.log("With error" , error);
    }
}

module.exports = connectDB;