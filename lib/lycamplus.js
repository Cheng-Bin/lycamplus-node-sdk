
var _ = require('underscore');
var LycamPlusOAuth = require('./oauth');
var User = require('./user');
var Stream = require('./stream');
var defaultConfig = require('./config');


/**
 * 
 * 
 * @param {object} config
 *  
 */
function LycamPlus(config) {
    // cover config
    _.extend(defaultConfig, config)

    // init master token
    LycamPlusOAuth.initToken();
}


LycamPlus.prototype.newUser = function() {
    return new User();
}


LycamPlus.prototype.newStream = function() {
    return new Stream();
}


exports = module.exports = LycamPlus;