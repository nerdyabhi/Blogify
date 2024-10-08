const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConnect.js');
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth.js");
const { log } = require('util');
require("dotenv").config();

// Database connection
connectDB();

// Ejs and View engine setup
app.set("view engine", "ejs");
app.set("views" , path.resolve("./views"));

// Middleware's
    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(express.static('public'));


// Routes for user
app.use("/" , require("./routes/userRoutes"));
 
// Routes for Blogs
app.use("/blogs" , auth  , require("./routes/blogRoutes"))






// Catch-all route for non-existing routes
app.use((req, res) => {
    res.status(404).render('404'); 
})


// Port
app.listen(PORT, ()=> console.log("Server started at http://localhost:3000"));
