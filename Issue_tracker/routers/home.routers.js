const express = require('express');
const homeController = require('../controllers/home.controllers');
const router = express.Router();

router.get('/', homeController.index);
router.post('/detail_page', homeController.getSearchResult);
router.get('/detail_page', homeController.getDetails);
router.use('/detail_page/bug', require('./bug.routers'));

module.exports = router;