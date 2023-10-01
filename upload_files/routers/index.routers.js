const express = require('express');

const router = express.Router();

router.use('', require('./info.routers'));

module.exports = router;
