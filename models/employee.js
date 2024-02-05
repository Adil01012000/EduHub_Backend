const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    organization_id: {
        type: String,   
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    mobile_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    emergency_mobile_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "Invalid email format",
        },
    },
    cnic: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_cnic: {
        type: String,
        required: true,
        maxlength: 50,
    },
    address: {
        type: String,
        required: true,
        maxlength: 255,
    },
    country: {
        type: String,
        required: true,
        maxlength: 50,
    },
    city: {
        type: String,
        required: true,
        maxlength: 50,
    },
    province: {
        type: String,
        required: true,
        maxlength: 50,
    },
    zip_code: {
        type: Number,
        required: true,
        maxlength: 15,
    },
    joining_date: {
        type: String,
        required: true,
        maxlength: 50,
    },
    monthly_salary: {
        type: Number,
        required: true,
        maxlength: 50,
    },
    designation: {
        type: String,
        required: true,
        maxlength: 50,
    },
    employee_type: {
        type: String,
        required: true,
        maxlength: 50,
    },
    gender: {
        type: String,
        required: true,
        maxlength: 50,
    },
    marital_status: {
        type: String,
        required: true,
        maxlength: 50,
    },
    date_of_birth: {
        type: String,
        required: true,
        maxlength: 50,
    },
    religion: {
        type: String,
        required: true,
        maxlength: 50,
    },
    blood_group: {
        type: String,
        required: true,
        maxlength: 50,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;