const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

// controllers
const entryController = require('../controllers/entry.controller');


// set routes
router.get('/fetchAuthID', awaitHandlerFactory(entryController.fetchAuthenticatedID));
router.post('/createAccount', awaitHandlerFactory(entryController.createAccount))
router.post('/validateAuthoriseUser', awaitHandlerFactory(entryController.validateAuthoriseUser))


module.exports = router;