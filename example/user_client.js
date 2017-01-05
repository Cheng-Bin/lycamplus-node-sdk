console.log();

var assert = require('assert');
var clients = require('restify-clients');
var _ = require('underscore');

var client = clients.createClient({
  url: 'http://localhost:3000',
  type: 'json'
});


var payload = {
    username: 'test_' + _.now(),
    password: '6666666mn'
};

//创建用户
client.post('/user', payload, function (err, req, res, user) {
    if (err) return;
    console.log('/user: Server returned: %j\n', user);
    
    // 获取token
    client.post('/assume', {uuid: user.uuid}, function (err, req, res, obj) {
        console.log('/assume: Server returned : %j\n', obj);
    });
});
