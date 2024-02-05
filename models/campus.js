const mongoose = require("mongoose");

const campusSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
        maxlength:50,
    },
    campus_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        maxlength: 255,
    },
    campus_location: {
        type: String,
        required: true,
        maxlength: 255,
    },
    campus_phone: {
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

const Campus = mongoose.model("Campus", campusSchema);

module.exports = Campus;