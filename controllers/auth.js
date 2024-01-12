
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const JWT_SECRET = 'sidhantsecret';
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET);
}

const register = async (req, res) => {
    try {
        const { name, dob, email, password } = req.body;
        console.log('Received request:', req.body);

        const salt = await bcryptjs.genSalt(10);
        console.log('Generated salt:', salt);

        const hashPassword = await bcryptjs.hash(password, salt);
        console.log('Hashed password:', hashPassword);

        const newUser = new User({
            userName: name,
            dob,
            email,
            password: hashPassword
        });

        console.log('New user object:', newUser);

        await newUser.save();
        console.log('User saved successfully');

        const token = createToken(newUser._id);
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ message: 'Email and Password both are required' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(403).json({ message: 'User is not available.' });
    }

    const comparepassword = await bcryptjs.compare(password, user.password);

    if (!comparepassword) {
        return res.status(401).json({ message: 'Incorrect User or password' });
    }

    const token = createToken(user._id);
    res.status(200).json({
        message: 'Logged in succesfully',
        token: token
    });
}

module.exports = { register, login };

