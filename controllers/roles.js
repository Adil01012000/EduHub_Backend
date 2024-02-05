const Roles = require("../models/role");
const Organization = require("../models/organization");

// POST role api
const createRole = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const role = await Roles.create({ ...req.body });
        res.status(200).json({ message: "Role created successfully", role});
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
             res.status(400).json({ message: "Duplicate entry. Role already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET roles api
const getRoles = async (req, res) => {
    try {
        const roles = await Roles.find();

        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE role api
const deleteRole = async (req, res) => {
    try {
        const roleId = req.body._id;
        if (!roleId) {
            return res.status(400).json({ message: "Role ID is missing!" });
        }

        const role = await Roles.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        await Roles.findByIdAndDelete(roleId);

        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE role api
const updateRole = async (req, res) => {
    try {
        const roleId = req.body._id;
        const updates = req.body;

        const role = await Roles.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        Object.assign(role, updates);
        const updateRole = await role.save();

        res.status(200).json({ message: "Role updated successfully", updateRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET role by id api
const getRoleById = async (req, res) => {
    try {
        const roleId = req.body._id;
        if (!roleId) {
            return res.status(400).json({ message: "Role ID is missing" });
        }

        const role = await Roles.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({ role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRole, getRoles, deleteRole, updateRole, getRoleById };