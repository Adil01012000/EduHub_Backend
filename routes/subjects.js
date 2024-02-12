const express = require("express");
const router = express.Router();

const { createSubject, getSubjects, deleteSubject, updateSubject, getSubjectById } = require("../controllers/subjects");

router.route("/createSubject").post(createSubject);
router.route("/getAllSubjects").get(getSubjects);
router.route("/deleteSubject").post(deleteSubject);
router.route("/updateSubject").post(updateSubject);
router.route("/getSubjectById").get(getSubjectById);

module.exports = router;