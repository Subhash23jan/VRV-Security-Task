

const Admin = require('../models/adminSchema');
const Vendor = require('../models/vendorSchema');
const Customer = require('../models/userSchema');
const Order = require('../models/orderSchema');
const Product = require('../models/productSchema');

const allVendors = async (req, res) => {
    const vendors = await Vendor.find({});
    res.json(vendors);
};

const allCustomers = async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
};

const allOrders = async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
};

const allProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json({ message: `User with ID ${id} has been deleted` });
}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
     res.json({ message: `Product with ID ${id} has been deleted` });
}
const removeVendor= async (req, res) => {
    const id = req.params.id;
    const vendor = await Vendor.findByIdAndDelete(id);
    res.json({ message: `Vendor with ID ${id} has been deleted` });
}

module.exports = {allVendors, allCustomers, allOrders, allProducts, deleteUser, deleteProduct, removeVendor}; 