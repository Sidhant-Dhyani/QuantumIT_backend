
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;