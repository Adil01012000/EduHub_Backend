const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    organization_name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    organization_email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "Invalid email format",
        },
    },
    organization_phone: {
        type: String,
        required: true,
        maxlength: 50,
    },
    organization_password: {
        type: String,
        required: true,
        maxlength: 100, 
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

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
