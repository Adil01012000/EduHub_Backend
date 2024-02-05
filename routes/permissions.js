const express = require("express");
const router = express.Router();

const { createPermission, getPermissions, deletePermission, updatePermission, getPermissionById } = require("../controllers/permissions");

router.route("/createPermission").post(createPermission);
router.route("/getAllPermissions").get(getPermissions);
router.route("/deletePermission").post(deletePermission);
router.route("/updatePermission").post(updatePermission);
router.route("/getPermissionById").get(getPermissionById);

module.exports = router;