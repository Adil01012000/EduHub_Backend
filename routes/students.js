const express = require("express");
const router = express.Router();

const { createStudent, getStudents, deleteStudent, updateStudent, getStudentById } = require("../controllers/students");

router.route("/createStudent").post(createStudent);
router.route("/getAllStudents").get(getStudents);
router.route("/deleteStudent").post(deleteStudent);
router.route("/updateStudent").post(updateStudent);
router.route("/getStudentById").get(getStudentById);

module.exports = router;