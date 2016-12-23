var request = require('request');
var config = require('./config');

function HttpClient(){}


/**
 * 
 * 
 * @param {any} method
 * @param {any} api
 * @param {any} params
 * @returns
 */
HttpClient.prototype.httpRequest = function(method, api, params) {
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
 * @param {any} method
 * @param {any} api
 * @param {any} _params
 * @param {any} callback
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


/**
 * exports 
 * 
 * @params config 
 */
exports = module.exports = new HttpClient();