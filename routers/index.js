const express = require('express');
const index = require('../controllers/index');
const page = require('./page');
const point = require('./point');

const router = express.Router();

router.use('/point', point);
router.use('/page', page)

router.get('/', index);

module.exports = router;