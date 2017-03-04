const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
  id: String,
  title: String,
  authors: [String],
  publisher: String,
  thumbnail: String,
  language: String,
  link: String,
});

module.exports = mongoose.model('Book',bookSchema);