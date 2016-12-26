var expect = require('chai').expect;
var lycamplus = require('./');
var _ = require('underscore');

setTimeout(function() {

    describe('Stream', function() {
        var uuid = '33527830-c99d-11e6-b9c8-8986900ae4ab';
        var streamInstance = null;
        var streamObj = null;        
        before(function() {
            streamInstance = lycamplus.newStream();
        });
        after(function() {
            streamInstance = null;
            streamObj = null;
        });


        describe('Stream.create()', function() {
            it('it should return an object', function(done) {
                streamInstance.create({user: uuid, title: 'test'}, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        streamObj = result;
                        expect(result).to.be.an('object');
                        done();
                    }
                });
            });
        });
        
        
        describe('Stream.update()', function() {
            it('it should return an object', function(done) {
                var str = 'test live';
                streamInstance.update(streamObj.streamId, {'description': str},
                     function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result.description).to.equal(str);
                        done();
                    }
                });
            });
        });
        
        
        describe('Stream.show()', function() {
            it('it should have title property', function(done) {
                streamInstance.show(streamObj.streamId, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('title');
                        done();
                    }
                });
            });
        });
        
        
        describe('Stream.list()', function() {
            it('it should have totalItems property', function(done) {
                streamInstance.list(function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('totalItems');
                        done();
                    }
                });
            });
        });

        describe('Stream.listSince()', function() {
            it('it should have totalItems property', function(done) {
                streamInstance.listSince(_.now(), function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('totalItems');
                        done();
                    }
                });
            });
        });


        describe('Stream.searchByKeyword()', function() {
            it('it should have totalItems property', function(done) {
                var params = {title: 'test'};
                streamInstance.searchByKeyword(params, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('totalItems');
                        done();
                    }
                });
            });
        });

        describe('Stream.searchByLocation()', function() {
            it('it should have totalItems property', function(done) {
                var params = {lon: '0',  lat: '0'};
                streamInstance.searchByLocation(params, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('totalItems');
                        done();
                    }
                });
            });
        });

        describe('Stream.destroy()', function() {
            it('it should have success property', function(done) {
                streamInstance.destroy(streamObj.streamId, function(err, result) {
                    if (err) {
                        done(err);
                    } else {
                        expect(result).to.have.property('success');
                        done();
                    }
                });
            });
        });

    });

    run();
}, 3500);


