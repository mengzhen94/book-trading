const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
  id: String,
  owner:  {
    type: String,
    default: ''
  },
  title: String,
  authors: [String],
  publisher: String,
  thumbnail: String,
  language: String,
  link: String,
  requested: {
    type: Boolean,
    default: false
  },
  active: Boolean
});

module.exports = mongoose.model('Book',bookSchema);