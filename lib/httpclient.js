var request = require('request');
var config = require('./config');

function LycamRequest(){}

/**
 * 
 * 
 * @param {string} method
 * @param {string} api
 * @param {object} params
 * @returns
 */
LycamRequest.prototype.httpRequest = function(method, api, params) {
    return new Promise(function(resolve, reject) {
        _request(method, api, params, function(err, response, obj) {
            if (err) {
                reject(err);
            } else {
                resolve(obj);
            }
        });
    });
}

/**
 * 
 * 
 * @param {string} method
 * @param {string} api
 * @param {object} _params
 * @param {function} callback
 */
function _request(method, api, _params, callback) {
    var urlString = config.apiURL + "/" + config.apiVersion + "/" + api;
    var options = {};
    options.uri = urlString;
    options.method = method;
    options.headers = {
         'Authorization' : 'Bearer ' + config.tokenObj.token.access_token
    };
    if (method === 'GET') {
        options.qs = _params;
    } else {
        options.form = _params;
    }
    request(options, function(error, response, body) {
        var obj = body;
        if(response && response.statusCode && parseInt(response.statusCode) >= 300){
            return callback(
                {
                    code: response.statusCode,
                    statusMessage: response.statusMessage,
                    message: obj
                }, 
                response,
                null
            );
        }
        try {
            obj = JSON.parse(body);
        } catch(err) {}
        callback(error, response, obj);
    });
}


var httpClient = null;

LycamRequest.getInstance = function() {
    if (!httpClient) {
        httpClient = new LycamRequest();
    }
    return httpClient;
}

exports = module.exports = LycamRequest.getInstance();
