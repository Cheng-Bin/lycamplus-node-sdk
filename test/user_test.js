var expect = require('chai').expect;
var lycamplus = require('./');


setTimeout(function() {

    describe('User', function() {

        var user = null;
        before(function() {
            user = lycamplus.newUser();
        });
        after(function() {
            user = null;
        });


        describe('User.list()', function() {
            it('it should have property items', function(done) {
                user.list({}, function(err, users) {
                    if (err) {
                        done(err);
                    } else {
                        expect(users).have.property('items');
                        done();
                    }
                });
            });

            it('it should have property items', function(done) {
                user.list({})
                    .then(function(users) {
                        expect(users).have.property('items');
                        done();
                    }).catch(function(err) {
                        done(err);  
                    });
            });
        });


    });

    run();
}, 3000);