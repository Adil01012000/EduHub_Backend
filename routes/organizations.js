const express = require("express");
const router = express.Router();

const { registerOrganization, getOrganizations, deleteOrganization, updateOrganization, getOrganizationById } = require("../controllers/organizations");

router.route("/registerOrganization").post(registerOrganization);
router.route("/getAllOrganizations").get(getOrganizations);
router.route("/deleteOrganization").post(deleteOrganization);
router.route("/updateOrganization").post(updateOrganization);
router.route("/getOrganizationById").get(getOrganizationById);

module.exports = router;