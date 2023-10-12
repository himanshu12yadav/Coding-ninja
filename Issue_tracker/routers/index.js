const express = require('express');
const router = express.Router();

router.use('', require('./home.routers'));
router.use('/project', require('./project.routers'));
module.exports = router;