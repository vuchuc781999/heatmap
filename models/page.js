const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  hostname: {
    type: String,
    required: true,
    trim: true
  },
  pathname: {
    type: String,
    default: '',
    trim: true
  },
  width: {
    type: Number,
    default:0,
    min: 0
  },
  height: {
    type: Number,
    default: 0,
    min: 0
  }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;