
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const user = req.body.user;
    try {
        const newUser = await User.create(user);
        console.log(newUser);
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
    // const { email, password } = req.body;
    const credentials = {
        name: 'John Doe',
        email: 'ab@gmaiil.com',
        password: "123456",
        role: 'customer',
        tokens: []
    };
    try {
        const user = await User.findOne({ email: credentials.email, password: credentials.password });
        if (!user) {
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
};  // This exports the functions so they can be used in other files.