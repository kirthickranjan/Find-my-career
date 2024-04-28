const express = require("express");
const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");



const router = express.Router();

router
    .route("/login")
    .get(userController.login)
    .post(userController.postLogin)

router
    .route("/logout")
    .post(userController.logout)


router
    .route("/signup")
    .get( userController.getSignup)
    .post( userController.postSignup)

router
    .route("/profile")
    .get(isAuth , userController.getProfile)
    .post(isAuth ,userController.updateProfile)




module.exports = router;

