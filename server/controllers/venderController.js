

const Product = require('../models/productSchema');


const myProducts = async (req, res) => {
    try {
        let products = await Products.find({ vendorId: req.user._id });
        res.status(200).send(products);
        
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

const addProduct = async (req, res) => {
    const productData = req.body.product;
    console.log(productData);
    try {
        const newProduct = new Product({
            ...productData,
            venderId: req.user._id
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        let product = await Products.findOneAndDelete({ _id: req.params.id, vendorId: req.user._id });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports = { myProducts, addProduct, deleteProduct };