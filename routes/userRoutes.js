const express = require('express');
const router = express.Router();
const { renderHomePage , renderSignupPage , renderSigninPage , userSignupHandler , userSigninHandler , userLogoutHandler , renderUserProfile} = require('../controllers/userControllers');
const multer = require('multer');


const storage = multer.memoryStorage();

const upload = multer({storage:storage});


router.get("/" ,renderHomePage )
router.route("/signup").get(renderSignupPage).post( upload.single("profileImage"), userSignupHandler);
router.route("/signin").get(renderSigninPage).post(userSigninHandler);
router.get("/logout" , userLogoutHandler);
router.get("/profile" , renderUserProfile);

module.exports = router;