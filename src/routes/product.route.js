const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// controllers
const productController = require('../controllers/product.controller');

// set routes
router.post('/createGiftCardBrand', awaitHandlerFactory(productController.createGiftCardBrand));
router.post('/createGiftCard', awaitHandlerFactory(productController.createGiftCard));
router.post('/createTransaction', awaitHandlerFactory(productController.createNewTransaction));

module.exports = router;