const express = require('express');
const Point = require('../controllers/point');

const router = express.Router();

router.post('/', Point.updatePoint);

router.get('/', Point.getPoint);

module.exports = router;