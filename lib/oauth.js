var Promise = require('bluebird');
var nodeify = require('bluebird-nodeify');
var simpleoauth2 = require('simple-oauth2');
var config = require('./config');

/**
 * constructor
 * 
 */
function LycamplusOAuth2() {}


/**
 * init token
 * 
 * @returns
 */
LycamplusOAuth2.initToken = function() {
    var oauth2 = simpleoauth2.create(getCredentials());
    oauth2.ownerPassword.getToken(getTokenConfig(), function(err, result) {
        if (err) {
            console.error('get access token failed : ' , err);
        } else {
            config.tokenObj = oauth2.accessToken.create(result);
            if (!config.tokenObj.token.expires_at) {
               console.error('get access token failed');
            } else {
              var start = Date.now();
              var end = new Date(config.tokenObj.token.expires_at);
              var timestamp = (end - start) / 1000;
              if (timestamp <= 0) {
                LycamplusOAuth2.initToken();
              } else {
                setTimeout(function() {
                  LycamplusOAuth2.initToken();
                }, timestamp);
              }
            }
        }
    });
}


/**
 * getCredentials by config
 * 
 * @returns
 */
function getCredentials() {
    var credentials = {
      client: {
        id: config.appKey,
        secret: config.appSecret,
      },
      auth: {
        tokenHost: config.oauth2URL,
        tokenPath: config.tokenPath
      }
    };
    
    return credentials;
}


/**
 * oauth2 password mode
 * 
 * @returns
 */
function getTokenConfig() {
  var tokenConfig = {
    username: config.username,
    password: config.password
  };
  return tokenConfig;
}


/**
 * exports 
 * 
 * @params config 
 */
exports = module.exports = LycamplusOAuth2;