const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// controllers
const productController = require('../controllers/product.controller');

// set routes
router.post('/createGiftCardBrand', awaitHandlerFactory(productController.createGiftCardBrand));
router.post('/processPaymentCallback', awaitHandlerFactory(productController.createPaymentCallback));
router.post('/createPaymentRequest', awaitHandlerFactory(productController.createPaymentRequest));
router.post('/createGiftCard', awaitHandlerFactory(productController.createGiftCard));
router.post('/createTransaction', awaitHandlerFactory(productController.createNewTransaction));
router.post('/createPaymentNetwork', awaitHandlerFactory(productController.createPaymentNetworks));
router.get('/fetchTransactions/:entryid', awaitHandlerFactory(productController.getTransactions));
router.get('/getGiftCards/:entryid/:cardtype', awaitHandlerFactory(productController.fetchCustomerCards));
router.get('/fetchCryptoNetworks/', awaitHandlerFactory(productController.fetchPaymentNetworks));
router.get('/fetchPaymentStatus/:transid', awaitHandlerFactory(productController.fetchPaymentStatus));
router.get('/setRedeemStatus/:cardid', awaitHandlerFactory(productController.setRedemptionStatus));

module.exports = router;