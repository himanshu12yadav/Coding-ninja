const express = require('express');

const productController = require('../controller/product.controller');
const router = express.Router();

router.get('/list', productController.allProduct);
router.get('/delete/:id', productController.delete);
router.post('/create', productController.create);
router.post('/update/:id', productController.update);

module.exports = router; 