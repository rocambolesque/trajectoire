var config = require('../config');
var mongoose = require('mongoose');
if (mongoose.connection.readyState == 0) {
  mongoose.connect(config.db.uri);
}

var Interest = require(__dirname + '/../../models/interest.js');
var User = require(__dirname + '/../../models/user.js');

var assert = require('assert');
var should = require('should');
var testUser;

after(function(done){
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(function(){
      done();
    });
  });
});

describe('User', function(){
  beforeEach(function(done){
    testUser = {name: 'User1'};
    var interest1 = new Interest({label: "Interest1"});
    var interest2 = new Interest({label: "Interest2"});
    interest1.save();
    interest2.save();
    testUser.interests = [interest1, interest2];
    User.remove(done);
  });

  describe('#save()', function(){
    var user;
    beforeEach(function(done){
      user = new User(testUser);
      done();
    })

    it('should have name property', function(done){
      user.save(function(err, user){
        should.not.exist(err);
        user.should.have.property('name', 'User1');
        done();
      });
    });

    it('should have interests', function(done){
      user.save(function(err, user){
        should.not.exist(err);
        Interest.findById(user.interests[0], function(err, interest){
          should.not.exist(err);
          interest.should.have.property('label', 'Interest1');
          Interest.findById(user.interests[1], function(err, interest){
            should.not.exist(err);
            interest.should.have.property('label', 'Interest2');
            done();
          });
        });
      });
    });
  });
});
