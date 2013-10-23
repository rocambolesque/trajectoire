var Interest = require('../models/interest.js');
var User = require('../models/user.js');

exports.index = function(req, res){
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { title: users[0].name });
    }
  });
};
