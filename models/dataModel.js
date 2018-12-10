const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const dataSchema = new Schema({
  crusts: [{
  	description: String,
  	price: Number 
  }],
  toppings: [{
  	description: String,
  	price: Number 
  }],
  sizes: [{
  	description: String,
  	price: Number 
  }]
});

module.exports = mongoose.model('Data', dataSchema);
