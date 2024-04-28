const express = require("express");
const postController = require("./../controller/postController");
const isAuth = require("../middleware/isAuth");


const router = express.Router();

router
    .route("/")
    .get(postController.getPosts)

router
    .route("/create")
    .get(isAuth,postController.getCreatePost)
    .post(postController.createPost)



module.exports = router;

