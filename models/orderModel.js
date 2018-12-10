const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const orderSchema = new Schema({
  address: {
    type: String,
    required: [true, 'Address required']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'Phone number required']
  },
  qty: {
    type: Number,max:10
     validate:{
       validator: function (v) {
         return /\^(?:[1-9]|0[1-9]|10)$/.test(v);
       },
       message: '{VALUE} should be lower then 10'
     }
  },
  size: String,
  toppings: String,
  crust: String,
  total: Number,
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
