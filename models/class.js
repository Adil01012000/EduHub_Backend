const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
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
    class_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        maxlength: 255,
    },
    capacity: {
        type: Number,
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

const Class = mongoose.model("Class", classSchema);

module.exports = Class;