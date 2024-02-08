const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
        maxlength: 50,
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
    date_of_birth: {
        type: String,
        required: true,
        maxlength: 50,
    },
    gender: {
        type: String,
        required: true,
        maxlength: 50,
    },
    birth_form_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    home_phone_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    admission_date: {
        type: String,
        required: true,
        maxlength: 50,
    },
    blood_group: {
        type: String,
        required: true,
        maxlength: 50,
    },
    religion: {
        type: String,
        required: true,
        maxlength: 50,
    },
    permanent_address: {
        type: String,
        required: true,
        maxlength: 255,
    },
    permanent_country: {
        type: String,
        required: true,
        maxlength: 50,
    },
    permanent_city: {
        type: String,
        required: true,
        maxlength: 50,
    },
    permanent_province: {
        type: String,
        required: true,
        maxlength: 50,
    },
    current_address: {
        type: String,
        required: true,
        maxlength: 255,
    },
    current_country: {
        type: String,
        required: true,
        maxlength: 50,
    },
    current_city: {
        type: String,
        required: true,
        maxlength: 50,
    },
    current_province: {
        type: String,
        required: true,
        maxlength: 50,
    },
    nationality: {
        type: String,
        required: true,
        maxlength: 50,
    },
    disability: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_cnic: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_mobile_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    father_occupation: {
        type: String,
        required: true,
        maxlength: 50,
    },
    mother_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    mother_cnic: {
        type: String,
        required: true,
        maxlength: 50,
    },
    mother_mobile_number: {
        type: String,
        required: true,
        maxlength: 50,
    },
    mother_occupation: {
        type: String,
        required: true,
        maxlength: 50,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;