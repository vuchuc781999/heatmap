const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const pointSchema = new Schema({
  pageID: {
    type: ObjectId,
    required: true
  },
  x: {
    type: Number,
    min: 0,
    required: true
  },
  y: {
    type: Number,
    min: 0,
    required: true
  },
  n: {
    type: Number,
    min: 1,
    default: 1
  }
});

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;