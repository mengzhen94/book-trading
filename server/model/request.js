const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  book: String,
  booklink: String,
  bookimg: String,
  bookid: String,
  ownerid: String,
  requesterid: String,
  approved: {
    type: Boolean,
    default: false },
  active: Boolean
});

module.exports = mongoose.model('Request', RequestSchema);