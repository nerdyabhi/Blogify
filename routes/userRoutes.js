const express = require('express');
const router = express.Router();
const { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler} = require('../controllers/userControllers');


router.get("/" ,renderHomePage )
router.get("/signup" , renderSignupPage);
router.get("/signin" , renderSigninPage);

router.post("/signup", userSignupHandler);
router.post("/signin" , userSigninHandler);
module.exports = router;