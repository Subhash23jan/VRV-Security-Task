const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const user = req.body.user;
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const newUser = await User.create(user);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).send(token);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid login credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid login credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        user.tokens = user.tokens.concat({ token });
        await user.save();

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).send(token);

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token').status(200);
    res.send('You are logged out');
};

module.exports = {
    login,
    logout,
    register
};
