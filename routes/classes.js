const express = require("express");
const router = express.Router();

const { createClass, getClasses, deleteClass, updateClass, getClassById } = require("../controllers/classes");

router.route("/createClass").post(createClass);
router.route("/getAllClasses").get(getClasses);
router.route("/deleteClass").post(deleteClass);
router.route("/updateClass").post(updateClass);
router.route("/getClassById").get(getClassById);

module.exports = router;