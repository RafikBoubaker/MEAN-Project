const express = require("express");


const PostController = require("../controllers/post")

const router = express.Router();

const checkAuth = require("../middleware/check-auth")
const extractFile = require("../middleware/file")




router.post(
  "",
  //auth middleware
  checkAuth,
  //multer middleware
  extractFile ,  PostController.createPost);



 
router.put(
  "/:id",
  //auth middleware
  checkAuth, extractFile,  PostController.updatePost)


router.get("",  PostController.getAllPosts);


router.get("/:id", PostController.getPostById );


router.delete("/:id",  checkAuth, PostController.deletePost )

module.exports = router;
