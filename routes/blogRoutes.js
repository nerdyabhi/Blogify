const express = require('express');
const router = express.Router();
const {renderBlogPage , postBlogHandler , renderSinglePageBlog} = require("../controllers/blogControllers");
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination:function (req, file , cb) {
//         cb(null, path.resolve(__dirname, "../public/images/uploads"));
//     },

//     filename:function(req, file , cb){
//         const fileName =`${Date.now()}-${file.originalname}`
//         cb(null , fileName);
//     }
// })

const storage = multer.memoryStorage();

const upload = multer({storage:storage});

router.get("/" , renderBlogPage);
router.post("/" , upload.single("file"),  postBlogHandler);
router.get("/:id", renderSinglePageBlog);

module.exports = router;