var nodeify = require('bluebird-nodeify');
var httpClient = require('./httpclient');

/**
 *   constructor
 */
function User() {}


/**
 * 
 * 
 * @param {any} params
 * @param {any} callback
 * @returns
 */
User.prototype.list = function(params, callback) {
    var url = 'users';
    return nodeify(httpClient.httpRequest('GET', url, params), callback);
}


exports = module.exports = User;