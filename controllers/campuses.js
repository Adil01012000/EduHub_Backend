const Campus = require("../models/campus");

// POST campus api
const createCampus = async (req, res) => {
    try {
        const maxIdCampus = await Campus.findOne({}, { id: 1 }, { sort: { id: -1 }});
        const newCampusId = maxIdCampus ? maxIdCampus.id + 1 : 1;

        const campus = await Campus.create({ ...req.body, id: newCampusId });

        res.status(200).json({ message: "Campus created successfully", campus});
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. Campus already exists." });
        } else {
            res.status(500).json({ message: error.message})
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