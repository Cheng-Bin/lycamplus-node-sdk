var _ = require('underscore');
var LycamPlusOAuth = require('./oauth');
var User = require('./user');
var Stream = require('./stream');
var defaultConfig = require('./config');

/**
 * constructor
 * 
 * @param {object} config
 */
function LycamPlus(config) {
    // cover config
    _.extend(defaultConfig, config)

    // init master token
    LycamPlusOAuth.initToken();
}


/**
 *  get user Instance
 * 
 * @returns User Instance
 */
LycamPlus.prototype.newUser = function() {
    return new User();
}



/**
 * get stream Instance
 * 
 * @returns Stream Instance
 */
LycamPlus.prototype.newStream = function() {
    return new Stream();
}

// exports
exports = module.exports = LycamPlus;