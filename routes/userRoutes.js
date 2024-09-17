const express = require('express');
const router = express.Router();
const { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler} = require('../controllers/userControllers');


router.get("/" ,renderHomePage )
router.get("/signup" , renderSignupPage);
router.get("/signin" , renderSigninPage);

router.post("/signup", userSignupHandler);
router.post("/signin" , userSigninHandler);
router.get("/logout" , userLogoutHandler);
module.exports = router;