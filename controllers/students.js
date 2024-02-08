const Student = require("../models/student");
const Organization = require("../models/organization");

// POST student api
const createStudent = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if (!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing" });
        }

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const student = await Student.create({ ...req.body });
        res.status(200).json({ message: "Student created successfully", student });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001){
            res.status(400).json({ message: "Duplicate entry. Student already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET students api
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE students api
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.body._id;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is missing" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        await Student.findByIdAndDelete(studentId);

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE student api
const updateStudent = async (req, res) => {
    try {
        const studentId = req.body._id;
        const updates = req.body;

        const student = await Student.findById(studentId);
        if (!student){
            return res.status(400).json({ message: "Student not found" });
        }

        Object.assign(student, updates);
        const updateStudent = await student.save();

        res.status(200).json({ message: "Student updated successfully", updateStudent });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET student by id api
const getStudentById = async (req, res) => {
    try {
        const studentId = req.body._id;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is missing" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ student });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createStudent, getStudents, deleteStudent, updateStudent, getStudentById };