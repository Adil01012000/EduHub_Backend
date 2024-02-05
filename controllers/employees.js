const Employee = require("../models/employee");
const Organization = require("../models/organization");

// POST employee api
const createEmployee = async (req, res) => {
    try {
        const organizationId = req.body.organization_id;
        if(!organizationId) {
            return res.status(400).json({ message: "Organization ID is missing!" });
        }

        const organization = await Organization.findById(organizationId);
        if(!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        const employee = await Employee.create({ ...req.body });
        res.status(200).json({ message: "Employee created successfully", employee });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. Employee already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET employees api
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE employee api
const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.body._id;
        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is missing" });
        }

        const employee = await Employee.findById(employeeId)
        if (!employee) {
            return res.status(404).json({ message: "Employee not found!" });
        }

        await Employee.findByIdAndDelete(employeeId);

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE employee api
const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.body._id;
        const updates = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        Object.assign(employee, updates);

        const updateEmployee = await employee.save();
        res.status(200).json({ message: "Employee updated successfully", updateEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET employee by id api
const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.body._id;
        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is missing!" });
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEmployee, getEmployees, deleteEmployee, updateEmployee, getEmployeeById };