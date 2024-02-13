const User = require("../models/user");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = crypto.randomBytes(32).toString('hex');

// POST user api
const createUser = async (req, res) => {
    try {

        const { organization_id, user_name, email, password } = req.body;

        const existingOrganization = await User.findOne({ email });
        if (existingOrganization) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            organization_id,
            user_name,
            email,
            password: hashedPassword,
        });
        res.status(200).json({ message: "User created successfully!", user });
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. User already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// GET users api
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE user api
const deleteUser = async (req, res) => {
    try {
        const userId = req.body._id;
        if (!userId){
            return res.status(400).json({ message: "User ID is missing!" });
        }

        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE user api
const updateUser = async (req, res) => {
    try {
        const userId = req.body._id;
        const updates = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (updates.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updates.password, saltRounds);
            updates.password = hashedPassword;
        }

        Object.assign(user, updates);

        const updatedUser = await user.save();

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET user by id api
const getUserById = async (req, res) => {
    try {
        const userId = req.body._id;
        if (!userId){
            return res.status(400).json({ message: "User ID is missing!" });
        }

        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ user, token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getAllUsers, deleteUser, updateUser, getUserById, loginUser };