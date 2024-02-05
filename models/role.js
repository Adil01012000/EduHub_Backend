const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
        maxlength: 50,
    },
    role_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    role_description: {
        type: String,
        maxlength: 255,
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

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;