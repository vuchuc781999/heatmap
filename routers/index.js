const express = require('express');
const index = require('../controllers/index');

const points = require('../routers/points');

const router = express.Router();

router.use('/points', points);

router.get('/', index);

module.exports = router;