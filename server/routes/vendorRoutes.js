const express = require('express');

const router = express.Router();


const authorisationRoles = require('../middlewares/rolesAuthorization');

const { getProfile } = require('../controllers/publicControllers');

const { addProduct, deleteProduct, myProducts } = require('../controllers/venderController');

router.route('/')
  .get((req, res) => {
    res.send('Hello my vendor');
});

router.route('/profile')
  .get(authorisationRoles(['vendor']), getProfile);

router.route('/add-product')
  .post(authorisationRoles(['vendor']), addProduct);

router.route('/products')
    .get(authorisationRoles(['vendor']), myProducts);
    
router.route('/delete-product/:id')
    .delete(authorisationRoles(['vendor']), deleteProduct);

module.exports = router;
