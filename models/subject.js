const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    campus_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campus', 
        required: true,
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
