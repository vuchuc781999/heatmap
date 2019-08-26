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
  }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;