const jwt = require('jsonwebtoken');
const {validateToken} = require('../utils/auth')
const authhandler = (req ,res, next)=>{
    console.log(req.body);
    
    const token = req.cookies.authToken;
    if(!token) res.render("Signin" , {error:"Invalid User , Please login again"});
    
    try{
        const payload = validateToken(token);
        if(!payload) res.render("Signin" , {error:"Invalid User , Please login again"});
        req.user = payload;
        next();
    }
    catch(error){
        console.log("Some error occured in Auth" , error);
        res.render("Signin" , {error:"Some unknown error occurred."});
    }
}

module.exports = authhandler;