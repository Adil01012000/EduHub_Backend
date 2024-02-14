const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
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
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    section_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;