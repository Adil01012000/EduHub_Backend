const User = require("../models/user");

const registerUser = async (req, res) => {
    try {
        const maxIdUser = await User.findOne({}, { id: 1 }, { sort: { id: -1 } });
        const newUserId = maxIdUser ? maxIdUser.id + 1 : 1;

        const user = await User.create({ ...req.body, id: newUserId });

        res.status(200).json(user);
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).json({ message: "Duplicate entry. User already exists." });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { registerUser };
