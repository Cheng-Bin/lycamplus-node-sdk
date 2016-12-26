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
                 var params = {
                    username: 'root_' + _.now(),
                    password: 'password',
                    description: "this is a test",
                };
                userInstance.create(params, function(err, result) {
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

        describe('User.auth()', function() {
            it('the result have property success', function(done) {
                userInstance.auth(userObj.username, 'passdword', function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).have.property('success');
                        done();
                    }
                });
            });
        });


         describe('User.updatePassword()', function() {
            it('it should have success property', function(done) {
                userInstance.updatePassword(userObj.uuid, 'newpassword', function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).have.property('success');
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

         describe('User.search()', function() {
            it('it should return an object', function(done) {
                var params = {username: userObj.username};
                userInstance.search(params, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.be.an('object');
                        done();
                    }
                });
            });
        });

    });

    run();
}, 3500);