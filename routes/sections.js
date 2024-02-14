const express = require("express");
const router = express.Router();

const { createSection, getSections, deleteSection, updateSection, getSectionById } = require("../controllers/sections");

router.route("/createSection").post(createSection);
router.route("/getAllSections").get(getSections);
router.route("/deleteSection").post(deleteSection);
router.route("/updateSection").post(updateSection);
router.route("/getSectionById").get(getSectionById);

module.exports = router;