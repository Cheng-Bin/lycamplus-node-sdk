console.log();

var assert = require('assert');
var clients = require('restify-clients');
var _ = require('underscore');

var client = clients.createClient({
  url: 'http://localhost:3000',
  type: 'json'
});


// 创建视频流
var payload = {title: '测试创建直播视频'};
var streamObj = null;
client.post('/stream', payload, function (err, req, res, obj) {
    if (err) return;
    streamObj = obj;
    console.log('/stream(post): create stream success, streamId = %j\n', obj.streamId);
});

// 更新视频流 + 获取指定id视频流 + 获取用户视频流 + 销毁视频流
setTimeout(function() {

    client.get('/stream/' + streamObj.streamId, function (err, req, res, obj) {
         console.log('/stream/:streamId(get): Server returned : %j\n', obj);
    });
    
    client.get('/streams', function(err, req, res, obj) {
         console.log('/streams: Server returned : %j\n', obj);
    });


    var params = {streamId: streamObj.streamId, description: '88888'};
    client.put('/stream', params, function (err, req, res, obj) {
         console.log('/stream(put): Server returned : %j\n', obj);
    });


    client.del('/stream/' + streamObj.streamId, function (err, req, res, obj) {
         console.log('/stream/:streamId(del): Server returned : %j\n', obj);
    });

}, 3500);



