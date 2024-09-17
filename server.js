const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const connectDB = require('./config/dbConnect.js');
const cookieParser = require('cookie-parser');

// Database connection
connectDB();

// Ejs and View engine setup
app.set("view engine", "ejs");
app.set("views" , path.resolve("./views"));

// Required Middleware's
    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));
// Routes
app.use("/" , require("./routes/userRoutes"));
 

// Port
app.listen(PORT, ()=> console.log("Server started at http://localhost:3000"));
