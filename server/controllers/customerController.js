const Order = require('../models/orderSchema');


const makeOrder = async (req, res) => {
    try {
        const products = req.body.products;
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice += product.price * product.quantity;
        });
        let order = new Order({ products, userId: req.user._id, totalPrice });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports = { makeOrder, getOrders };