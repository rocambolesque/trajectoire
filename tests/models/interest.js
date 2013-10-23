var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trajectoire');

var Interest = require(__dirname + '/../../models/interest.js');
var User = require(__dirname + '/../../models/user.js');

var assert = require('assert');
var should = require('should');
var fakeUser;

describe('User', function(){
  beforeEach(function(done){
    fakeUser = {
      name    : 'User1'
    }
    // this cleans out your database before each test
    User.remove(done);
  });

  describe('#save()', function(){
    var user;
    // you can use beforeEach in each nested describe
    beforeEach(function(done){
      user = new User(fakeUser);
      done();
    })

    // you are testing for errors when checking for properties
    // no need for explicit save test
    it('should have name property', function(done){
      user.save(function(err, user){
        // dont do this: if (err) throw err; - use a test
        should.not.exist(err);
        user.should.have.property('name', 'User1');
        done();
      });
    });

    // now try a negative test
    it('should not save if name is not present', function(done){
      user.name = '';
      user.save(function(err, user){
        if (err) {
          throw err;
        }
        user.should.have.property('name', '');
        done();
      });
    });
  });
});
