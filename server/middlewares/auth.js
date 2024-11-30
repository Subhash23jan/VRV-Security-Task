const cookieParser = require('cookie-parser');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const userAuthentication = async(req, res, next) => {
    const token = req.cookies.token;
    if (token){
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(user.id);
    }
    next();
}

module.exports = userAuthentication; // This exports the function so it can be used in other files.