const express = require('express');
const points = require('../controllers/points');

const router = express.Router();

router.post('/', points.savePoints);

router.get('/', points.getPoints);

router.get('/create', points.createPoints);

module.exports = router;