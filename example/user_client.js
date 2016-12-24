console.log();

var assert = require('assert');
var clients = require('restify-clients');
var _ = require('underscore');

var client = clients.createClient({
  url: 'http://localhost:3000',
  type: 'json'
});

var timestamp = _.now();
var payload = {
    username: 'test_' + timestamp,
    password: '6666666mn'
};


//创建用户
client.post('/user', payload, function (err, req, res, obj) {
    if (err) return;
    console.log('/user: Server returned: %j\n', obj);
});

 // 用户密码验证 + 获取token + 修改密码
setTimeout(function() {
    
    client.post('/auth', payload, function (err, req, res, user) {
        console.log('/auth: Server returned, uuid = %j\n', user.uuid);

        // 获取token
        client.post('/assume', {uuid: user.uuid}, function (err, req, res, obj) {
            console.log('/assume: Server returned : %j\n', obj);
        });

        // 修改密码
        var passObj = {uuid: user.uuid, password: '6666666mm'};
        client.put('/password', passObj, function (err, req, res, obj) {
            console.log('/password: Server returned : %j\n', obj);
        });

    });

}, 2000);



