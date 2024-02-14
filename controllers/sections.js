const Section = require("../models/section");
const Organization = require("../models/organization");
const Campus = require("../models/campus");
const Class = require("../models/class");

// POST section api
const createSection = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId){
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization){
            return res.status(404).json({ message: "Organization not found" });
        }

        const section = await Section.create({ ...req.body });
        res.status(200).json({ message: "Section created successfully", section });
    } catch(error){
        if (error.code === 11000 || error.code === 11001){
            res.status(400).json({ message: "Duplicate entry exists. Section already exists" });
        } else{
            res.status(500).json({ message: error.message });
        }
    }
};

// GET section api
const getSections = async (req, res) => {
    try {
        const sections = await Section.find().populate('campus_id organization_id class_id');

        const sectionsWithDetails = sections.map(section => ({
            ...section.toObject(),
            campus_id: section.campus_id._id,
            organization_id: section.organization_id._id,
            class_id: section.class_id._id,
            campus_details: [ { ...section.campus_id.toObject() } ],
            organization_details: [ { ...section.organization_id.toObject() } ],
            class_details: [ { ...section.class_id.toObject() }]
        }));

        res.status(200).json({ sections: sectionsWithDetails });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE section api
const deleteSection = async (req, res) => {
    try {
        const sectionId = req.body._id;
        if (!sectionId){
            return res.status(400).json({ message: "Section ID is missing" });
        }

        const section = await Section.findById(sectionId);
        if (!section){
            return res.status(404).json({ message: "Section not found" });
        }

        await Section.findByIdAndDelete(sectionId);
        res.status(200).json({ message: "Section deleted successfully" });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE section api
const updateSection = async (req, res) => {
    try {
        const sectionId = req.body._id;
        const updates = req.body;

        if (!sectionId){
            return res.status(400).json({ message: "Section ID is missing!" });
        }

        const section = await Section.findById(sectionId);
        if (!section){
            return res.status(404).json({ message: "Section not found" });
        }

        Object.assign(section, updates);

        const updateSection = await section.save();
        res.status(200).json({ message: "Section updated successfully", updateSection });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET section by id api
const getSectionById = async (req, res) => {
    try {
        const sectionId = req.body._id;
        if (!sectionId){
            return res.status(400).json({ message: "Section ID is missing!" });
        }

        const section = await Section.findById(sectionId).populate('campus_id organization_id class_id');

        if (!section){
            return res.status(404).json({ message: "Section not found" });
        }

        const sectiontWithDetails = {
            ...section.toObject(),
            campus_id: section.campus_id._id,
            organization_id: section.organization_id._id,
            class_id: section.class_id._id,
            campus_details: [{ ...section.campus_id.toObject() }],
            organization_details: [{ ...section.organization_id.toObject() }],
            class_details: [{ ...section.class_id.toObject() }],
        };

        res.status(200).json({ section: sectiontWithDetails });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSection, getSections, deleteSection, updateSection, getSectionById };