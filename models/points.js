const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  x: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  y: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  n: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  }
});

const pointSchema = new Schema({
  hostname: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  pathname: {
    type: String,
    default: '',
    trim: true
  },
  coordinates: {
    type: [coordinateSchema],
    default: []
  }
});

const Points = mongoose.model('points', pointSchema);

module.exports = Points;