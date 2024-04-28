const express = require("express");
const careerController = require("./../controller/careerController")

const router = express.Router();

router
    .route("/")
    .get(careerController.getCareerLib)

router.route("/:data")
    .get(careerController.getCareer)



module.exports = router;

