const express = require('express');
const router = express.Router();
const authorisationRoles = require('../middlewares/rolesAuthorization');
const { getProfile } = require('../controllers/publicControllers');
const { allVendors, allCustomers, allOrders, allProducts } = require('../controllers/adminController');

// Admin route
router.route('/')
  .get(authorisationRoles(['admin']), (req, res) => {
    res.send('Hello my admin');
});

// Profile route
router.route('/profile')
  .get(authorisationRoles(['admin']), getProfile);

// All vendors route
router.route('/all-vendors')
  .get(authorisationRoles(['admin']), allVendors);

// All customers route
router.route('/all-customers')
  .get(authorisationRoles(['admin']), allCustomers);

// All orders route
router.route('/all-orders')
  .get(authorisationRoles(['admin']), allOrders);

// All products route
router.route('/all-products')
  .get(authorisationRoles(['admin']), allProducts);

module.exports = router;
