const express = require('express');
const router = express.Router();

router.use('/api', require('./product.router'));

module.exports = router;
