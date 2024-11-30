const authorisationRoles = (roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (roles.includes(req.user.role)) {
            return next();
        }
        return res.status(403).send('You don\'t have permission to access this resource');
    };
};
module.exports = authorisationRoles;