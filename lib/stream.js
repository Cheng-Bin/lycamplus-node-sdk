var nodeify = require('bluebird-nodeify');
var httpClient = require('./httpclient');


/**
 *  constructor
 */
function Stream() {}

/**
 * video stream create
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
Stream.prototype.create = function(params, callback) {
    var url = 'streams';
    return nodeify(httpClient.httpRequest('POST', url, params), callback);
}


/**
 * video stream update 
 * 
 * @param {string} streamId
 * @param {object} params
 * @param {function} callback
 */
Stream.prototype.update = function(streamId, params, callback) {
    var url = 'streams/' + streamId;
    return nodeify(httpClient.httpRequest('PUT', url, params), callback);
}

/**
 * video stream show
 * 
 * @param {string} streamId
 * @param {function} callback
 * @returns
 */
Stream.prototype.show = function(streamId, callback) {
    var url = 'streams/' + streamId;
    return nodeify(httpClient.httpRequest('GET', url, {}), callback);
}


/**
 * destroy a video stream
 * 
 * @param {any} streamId
 * @param {any} callback
 * @returns
 */
Stream.prototype.destroy = function(streamId, callback) {
    var url = 'streams/' + streamId;
    return nodeify(httpClient.httpRequest('DELETE', url, {}), callback);
}


/**
 * get video streams
 * 
 * @param {function} callback
 */
Stream.prototype.list = function(callback) {
    var url = 'streams';
    nodeify(httpClient.httpRequest('GET', url, {}), callback);
}



/**
 * get video stream by timestamp
 * 
 * @param {timestamp} timestamp
 * @param {function} callback
 */
Stream.prototype.listSince = function(timestamp, callback) {
    var url = 'streams/since/' + timestamp;
    nodeify(httpClient.httpRequest('GET', url, {}), callback);
}



/**
 * search video by keyword
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
Stream.prototype.searchByKeyword = function(params, callback) {
     var url = 'search';
     return nodeify(httpClient.httpRequest('POST', url, params), callback);
}

/**
 * search video by keyword
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
Stream.prototype.searchByKeyword = function(params, callback) {
     var url = 'search';
     return nodeify(httpClient.httpRequest('POST', url, params), callback);
}


/**
 * search video by location
 * 
 * @param {object} params
 * @param {function} callback
 * @returns
 */
Stream.prototype.searchByLocation = function(params, callback) {
     var url = 'search/location';
     return nodeify(httpClient.httpRequest('POST', url, params), callback);
}



// exports Stream Object
exports = module.exports = Stream;