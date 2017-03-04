const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userbookSchema = new schema({
  userId:{
    type:schema.Types.ObjectId,
    ref:'User'
  },
  bookId:{
    type:schema.Types.ObjectId,
    ref:'Book'
  },
  isOwner:{
    type:Boolean,
    default:true
  },
  count:{
    type:Number,
    default:1
  }
});

module.exports = mongoose.model('UserBook',userbookSchema);