const Class = require("../models/class");
const Organization = require("../models/organization");

// POST class api
const createClass = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId){
            return res.status(400).json({ message: "Organization ID is missing" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization){
            return res.status(404).json({ message: "Organization not found" });
        }

        const classs = await Class.create({ ...req.body });
        res.status(200).json({ message: "Class created successfully", classs });
    } catch(error) {
        if (error.code === 11000 || error.code ===11001){
            res.status(400).json({ message: "Duplicate entry. Class already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET class api
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find();

        res.status(200).json({ classes });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE class api
const deleteClass = async (req, res) => {
    try {
        const classId = req.body._id;
        if (!classId){
            return res.status(400).json({ message: "Class ID is missing!" });
        }

        const classs = await Class.findById(classId);
        if (!classs){
            return res.status(404).json({ message: "Class not found" });
        }

        await Class.findByIdAndDelete(classId);
        res.status(200).json({ message: "Class deleted successfully" });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE class api
const updateClass = async (req, res) => {
    try {
        const classId = req.body._id;
        const updates = req.body;

        const classs = await Class.findById(classId);
        if (!classs){
            return res.status(404).json({ message: "Class not found" });
        }

        Object.assign(classs, updates);

        const updateClass = await classs.save();
        res.status(200).json({ message: "Class updated successfully", updateClass });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET class by id api
const getClassById = async (req, res) => {
    try {
        const classId = req.body._id;
        if (!classId){
            return res.status(400).json({ message: "Class ID is missing!" });
        }

        const classs = await Class.findById(classId);
        if (!classs){
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({ classs });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createClass, getClasses, deleteClass, updateClass, getClassById };