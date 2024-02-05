const express = require("express");
const router = express.Router();

const { createRole, getRoles, deleteRole, updateRole, getRoleById } = require("../controllers/roles");

router.route("/createRole").post(createRole);
router.route("/getAllRoles").get(getRoles);
router.route("/deleteRole").post(deleteRole);
router.route("/updateRole").post(updateRole);
router.route("/getRoleById").get(getRoleById);

module.exports = router;