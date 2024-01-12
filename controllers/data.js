const { response } = require('express');
const User = require('../models/User');

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAll };