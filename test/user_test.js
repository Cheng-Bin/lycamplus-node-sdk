var expect = require('chai').expect;
var lycamplus = require('./');
var _ = require('underscore');


setTimeout(function() {

    describe('User', function() {

        var userObj = null;
        var userInstance = null;
        before(function() {
            userInstance = lycamplus.newUser();
        });
        after(function() {
            userInstance = null;
            userObj = null;
        });

         describe('User.create()', function() {
            it('it should return an obejct', function(done) {
                var username = 'root_' + _.now();
                var password = 'password';
                userInstance.create(username, password, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        userObj = result;
                        expect(result).to.be.an('object');
                        done();
                    }
                });
            });
        });
        
        
        describe('User.assume()', function() {
            it('it should have token property', function(done) {
                userInstance.assume(userObj.uuid, '*', function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(result);
                        expect(result).have.property('token');
                        done();
                    }
                });
            });
        });
        

    });

    run();
}, 3500);