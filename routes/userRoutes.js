const express = require('express');
const router = express.Router();
const { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler , renderUserProfile} = require('../controllers/userControllers');


router.get("/" ,renderHomePage )
router.route("/signup").get(renderSignupPage).post(userSignupHandler);
router.route("/signin").get(renderSigninPage).post(userSigninHandler);
router.get("/logout" , userLogoutHandler);
router.get("/profile" , renderUserProfile);

module.exports = router;