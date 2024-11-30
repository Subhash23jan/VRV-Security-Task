const express = require('express');
const router = express.Router();
const authorisationRoles = require('../middlewares/rolesAuthorization');
const {getOrders,makeOrder} = require('../controllers/customerController');
const {getProfile} = require('../controllers/publicControllers');

router.route('/')
  .get((req, res) => {
    res.send('Hello my customer');
});

router.route('/profile')
    .get(authorisationRoles(['customer']), getProfile);
  

router.route('/orders')
  .get(authorisationRoles(['customer']), getOrders);
router.route('/order-checkout')
  .post(authorisationRoles(['customer']), makeOrder);


module.exports = router;
