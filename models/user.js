const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    organization_id: {
        type: String,
        required: true,
    },
    user_name: {
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
    password: {
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

const User = mongoose.model("User", userSchema);

module.exports = User;