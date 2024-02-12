const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
        maxlength: 50,
    },
    campus_id: {
        type: String,
        required: true,
        maxlength: 50,
    },
    subject_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
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

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;