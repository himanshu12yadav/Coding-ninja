const express = require('express');
const router = express.Router();
const infoController = require('../controllers/info.controllers');

router.get('/:file', infoController.index);
// router.post('/:file', infoController.getSearch);
module.exports = router;
