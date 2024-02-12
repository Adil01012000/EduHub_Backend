const Subject = require("../models/subject");
const Organization = require("../models/organization");
const Campus = require("../models/campus");

// POST subject api
const createSubject = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId){
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization){
            return res.status(404).json({ message: "Organization not found" });
        }

        const campusId = req.body.campus_id;
        if (!campusId){
            return res.status(400).json({ message: "Campus ID is missing!" });
        }

        const campus = await Campus.findById(campusId);
        if (!campus){
            return res.status(404).json({ message: "Campus not found" });
        }

        const subject = await Subject.create({ ...req.body });
        res.status(200).json({ message: "Subject created successfully", subject });
    } catch(error){
        if(error.code === 11000 || error.code === 11001){
            res.status(400).json({ message: "Duplicate entry. Subject already exists" });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET subjects api
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('campus_id organization_id');

        const subjectsWithDetails = subjects.map(subject => ({
            ...subject.toObject(),
            campus_id: subject.campus_id._id,
            organization_id: subject.organization_id._id,
            campus_details: [ { ...subject.campus_id.toObject() } ],
            organization_details: [ { ...subject.organization_id.toObject() } ]
        }));

        res.status(200).json({ subjects: subjectsWithDetails });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// DELETE sujects api
const deleteSubject = async (req, res) => {
    try {
        const subjectId = req.body._id;
        if (!subjectId){
            return res.status(400).json({ message: "Subject ID is missing" });
        }

        const subject = await Subject.findById(subjectId);
        if (!subject){
            return res.status(404).json({ message: "Subject not found" });
        }

        await Subject.findByIdAndDelete(subjectId);
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE subject api
const updateSubject = async (req, res) => {
    try {
        const subjectId = req.body._id;
        const updates = req.body;

        if (!subjectId){
            return res.status(400).json({ message: "Subject ID is missing!" });
        }

        const subject = await Subject.findById(subjectId);
        if (!subject){
            return res.status(404).json({ message: "Subject not found" });
        }

        Object.assign(subject, updates);

        const updateSubject = await subject.save();
        res.status(200).json({ message: "Subject updated successfully", updateSubject });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET subject by id api
const getSubjectById = async (req, res) => {
    try {
        const subjectId = req.body._id;
        if (!subjectId){
            return res.status(400).json({ message: "Subject ID is missing!" });
        }

        const subject = await Subject.findById(subjectId).populate('campus_id organization_id');

        if (!subject){
            return res.status(404).json({ message: "Subject not found" });
        }

        const subjectWithDetails = {
            ...subject.toObject(),
            campus_id: subject.campus_id._id,
            organization_id: subject.organization_id._id,
            campus_details: { ...subject.campus_id.toObject() },
            organization_details: { ...subject.organization_id.toObject() }
        };

        res.status(200).json({ subject: subjectWithDetails });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createSubject, getSubjects, deleteSubject, updateSubject, getSubjectById };