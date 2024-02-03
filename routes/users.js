const express = require("express");
const router = express.Router();

const { createUser, getAllUsers, deleteUser, updateUser, getUserById } = require("../controllers/users");

router.route("/createUser").post(createUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/deleteUser").post(deleteUser);
router.route("/updateUser").post(updateUser); 
router.route("/getUserById").get(getUserById);

module.exports = router;