const express = require("express");
const router = express.Router();

const { createEmployee, deleteEmployee, getEmployees, updateEmployee, getEmployeeById } = require("../controllers/employees");

router.route("/createEmployee").post(createEmployee);
router.route("/deleteEmployee").post(deleteEmployee);
router.route("/getAllEmployees").get(getEmployees);
router.route("/updateEmployee").post(updateEmployee);
router.route("/getEmployeeById").get(getEmployeeById);

module.exports = router;