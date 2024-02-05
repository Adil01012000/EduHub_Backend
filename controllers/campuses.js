const Campus = require("../models/campus");
const Organization = require("../models/organization");

// POST campus api
const createCampus = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if(!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if(!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const campus = await Campus.create({ ...req.body });
        res.status(200).json({ message: "Campus created successfully", campus });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. Employee already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET all campuses api
const getCampuses = async (req, res) => {
    try {
        const campuses = await Campus.find();

        res.status(200).json({ campuses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE campus api
const deleteCampus = async (req, res) => {
    try {
        const campusId = req.body._id;
        if(!campusId) {
            return res.status(400).json({ message: "Campus ID is missing!" });
        }

        const campus = await Campus.findById(campusId);
        if(!campus) {
            return res.status(404).json({ message: "Campus not found" });
        }

        await Campus.findByIdAndDelete(campusId);

        res.status(200).json({ message: "Campus deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE campus api
const updateCampus = async (req, res) => {
    try {
        const campusId = req.body._id;
        const updates = req.body;

        const campus = await Campus.findById(campusId);

        if (!campus) {
            return res.status(404).json({ message: "Campus not found" });
        }

        Object.assign(campus, updates);
 
        const updateCampus = await campus.save();
        res.status(200).json({ message: "Campus updated successfully", updateCampus});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET campus by id api
const getCampusById = async (req, res) => {
    try {
        const campusId = req.body._id;
        if (!campusId) {
            return res.status(400).json({ message: "Campus ID is missing!" });
        }

        const campus = await Campus.findById(campusId);
        if (!campus) {
            return res.status(404).json({ message: "Campus not found!" });
        }

        res.status(200).json({ campus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createCampus, getCampuses, deleteCampus, updateCampus, getCampusById };