var config = require('../config');
var mongoose = require('mongoose');
if (mongoose.connection.readyState == 0) {
  mongoose.connect(config.db.uri);
}

var Interest = require(__dirname + '/../../models/interest.js');

var assert = require('assert');
var should = require('should');
var testInterest;

after(function(done){
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(function(){
      done();
    });
  });
});

describe('Interest', function(){
  beforeEach(function(done){
    testInterest = {label: 'Interest1'};
    Interest.remove(done);
  });

  describe('#save()', function(){
    var interest;
    beforeEach(function(done){
      interest = new Interest(testInterest);
      done();
    })

    it('should have label property', function(done){
      interest.save(function(err, interest){
        should.not.exist(err);
        interest.should.have.property('label', 'Interest1');
        done();
      });
    });
  });
});
