const express = require('express');
const Page = require('../controllers/page');

const router = express.Router();

router.get('/create', Page.createPage);

router.get('/size', Page.getSize)

module.exports = router;