const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bug.controllers');

router.get('/', bugController.getBugPage);
router.post('/create', bugController.create);

module.exports = router;

