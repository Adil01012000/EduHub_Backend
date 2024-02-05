const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
        maxlength: 50,
    },
    permission_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    permission_description: {
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

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;