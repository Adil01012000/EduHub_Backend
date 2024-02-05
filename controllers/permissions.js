const Permissions = require("../models/permission");
const Organization = require("../models/organization");

// POST permission api
const createPermission = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const permission = await Permissions.create({ ...req.body });
        res.status(200).json({ message: "Permission created successfully", permission});
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
             res.status(400).json({ message: "Duplicate entry. Role already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET permissions api
const getPermissions = async (req, res) => {
    try {
        const permissions = await Permissions.find();

        res.status(200).json({ permissions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE permission api
const deletePermission = async (req, res) => {
    try {
        const permissionId = req.body._id;
        if (!permissionId) {
            return res.status(400).json({ message: "Permission ID is missing!" });
        }

        const permission = await Permissions.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        await Permissions.findByIdAndDelete(permissionId);

        res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE permission api
const updatePermission = async (req, res) => {
    try {
        const permissionId = req.body._id;
        const updates = req.body;

        const permission = await Permissions.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        Object.assign(permission, updates);
        const updatePermission = await permission.save();

        res.status(200).json({ message: "Permission updated successfully", updatePermission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET permission by id api
const getPermissionById = async (req, res) => {
    try {
        const permissionId = req.body._id;
        if (!permissionId) {
            return res.status(400).json({ message: "Permission ID is missing" });
        }

        const permission = await Permissions.findById(permissionId);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        res.status(200).json({ permission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPermission, getPermissions, deletePermission, updatePermission, getPermissionById };