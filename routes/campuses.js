const express = require("express");
const router = express.Router();

const { createCampus, getCampuses, deleteCampus, updateCampus, getCampusById } = require("../controllers/campuses");

router.route("/createCampus").post(createCampus);
router.route("/getAllCampuses").get(getCampuses);
router.route("/deleteCampus").post(deleteCampus);
router.route("/updateCampus").post(updateCampus);
router.route("/getCampusById").get(getCampusById);

module.exports = router;