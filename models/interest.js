var mongoose = require('mongoose');

var interestSchema = new mongoose.Schema({
    label: String
});

module.exports = mongoose.model('Interest', interestSchema);
