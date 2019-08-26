const express = require('express');
const Page = require('../controllers/page');

const router = express.Router();

router.get('/', Page.createPage);

module.exports = router;