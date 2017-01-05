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
 * @param {any} username
 * @param {any} password
 * @param {any} callback
 * @returns
 */
User.prototype.create = function(username, password, callback) {
    var url = 'users';
    var params = {username: username, password};
    return nodeify(httpClient.httpRequest('POST', url, params), callback);
}



/**
 * get aceess token for special user 
 * 
 * @param {string} id           uuid
 * @param {string} scope        resource scope
 * @param {function} callback   callback
 * 
 * @returns 
 */
User.prototype.assume = function(id, scope='*', callback) {
    var url = 'users/' + id + '/assume';
    return nodeify(httpClient.httpRequest('POST', url, {}), callback);
}


// exports User Object
exports = module.exports = User;