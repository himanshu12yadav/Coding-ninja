const express = require('express');

const router = express.Router();
const projectController = require('../controllers/project.controllers');

router.get('/', projectController.createPage);
router.post('/create', projectController.create);

module.exports = router;