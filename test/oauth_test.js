
var expect = require('chai').expect;
var lycamplus = require('./');
var config = require('../lib/config');

setTimeout(function(){

    describe('Oauth', function() {
        describe('OAuth.token', function() {
            it('it should return object', function(done) {
                expect(config.tokenObj).to.be.an('object');
                done();
            });
        });
    });

    run();
}, 5000);