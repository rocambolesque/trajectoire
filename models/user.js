var mongoose = require('mongoose');
var Interest = require('../models/interest.js');

var userSchema = new mongoose.Schema({
    name: String,
    interests: [{type: mongoose.Schema.ObjectId, ref: 'Interest'}]
});

module.exports = mongoose.model('User', userSchema);
