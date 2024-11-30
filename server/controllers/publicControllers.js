
const allProducts = async (req, res) => {
    res.send('This is the products page');
};
const getProfile = async (req, res) => {
    res.send({user:req.user})
};

module.exports = {
    allProducts,
    getProfile
}; 