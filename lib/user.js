var Promise = require('bluebird');
var nodeify = require('bluebird-nodeify');
var httpClient = require('./httpclient');


/**
 *  constructor
 */
function User() {}




/**
 * create user
 * 
 * @param {object} params       userinfo
 * @param {function} callback   callback
 * 
 * @returns
 */
User.prototype.create = function(params, callback) {
    var url = 'users';
    return nodeify(httpClient.httpRequest('POST', url, params), callback);
}



/**
 * get aceess token for special user 
 * 
 * @param {string} id           uuid
 * @param {function} callback   callback
 * 
 * @returns 
 */
User.prototype.assume = function(id, callback) {
    var url = 'users/' + id + '/assume';
    return nodeify(httpClient.httpRequest('POST', url, {}), callback);
}


// exports User Object
exports = module.exports = User;