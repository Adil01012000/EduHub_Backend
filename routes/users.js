const express = require("express");
const router = express.Router();

const { createUser, getAllUsers, deleteUser, updateUser, getUserById, loginUser } = require("../controllers/users");

router.route("/createUser").post(createUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/deleteUser").post(deleteUser);
router.route("/updateUser").post(updateUser); 
router.route("/getUserById").get(getUserById);
router.route("/loginUser").post(loginUser);

module.exports = router;