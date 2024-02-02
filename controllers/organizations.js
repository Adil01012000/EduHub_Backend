const Organization = require("../models/organization");

// POST organization api
const registerOrganization = async (req, res) => {
    try {
        const maxIdOrganization = await Organization.findOne({}, { id: 1 }, { sort: { id: -1 } });
        const newOrganizationId = maxIdOrganization ? maxIdOrganization.id + 1 : 1;

        const organization = await Organization.create({ ...req.body, id: newOrganizationId });

        res.status(200).json({ message: "Organization created successfully", organization });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. Organization already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET all organizations api
const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();

        res.status(200).json({ organizations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE organization api
const deleteOrganization = async (req, res) => {
    try {
        const organizationId = req.body._id;
        if (!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        await Organization.findByIdAndDelete(organizationId);

        res.status(200).json({ message: "Organization deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE organization api
const updateOrganization = async (req, res) => {
    try {
        const organizationId = req.body._id;
        const updates = req.body;

        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        Object.assign(organization, updates);

        const updatedOrganization = await organization.save();

        res.status(200).json({ message: "Organization updated successfully", updatedOrganization });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET organization by id api
const getOrganizationById = async (req, res) => {
    try {
        const organizationId = req.body._id;
        if (!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        res.status(200).json({ organization });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerOrganization, getOrganizations, deleteOrganization, updateOrganization, getOrganizationById };