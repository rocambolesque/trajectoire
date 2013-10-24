var mongoose = require('mongoose');
var Interest = require('../models/interest.js');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    interests: [{type: mongoose.Schema.ObjectId, ref: 'Interest'}]
});

userSchema.methods.validPassword = function(password) {
  if (password === this.password) {
    return true; 
  } else {
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
