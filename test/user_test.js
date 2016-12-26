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


        describe('User.list()', function() {
            it('it should have property items', function(done) {
                userInstance.list({}, function(err, users) {
                    if (err) {
                        done(err);
                    } else {
                        expect(users).have.property('items');
                        done();
                    }
                });
            });

            it('it should have property items', function(done) {
                userInstance.list({})
                    .then(function(users) {
                        expect(users).have.property('items');
                        done();
                    }).catch(function(err) {
                        done(err);  
                    });
            });
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
            it('the result.username equal userObj.username', function(done) {
                userInstance.auth(userObj.username, 'password', function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result.username).to.equal(userObj.username);
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
}, 5000);