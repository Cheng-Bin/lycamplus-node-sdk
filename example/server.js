
var restify = require('restify');
var LycamPlus = require('../index.js');
var PORT = 3000;


// 1. 配置您的app参数, 并实例化SDK
var config = {
    appKey: '488ITUGN1G', // appKey
    appSecret: 'z1oyx55jNQEXeRUu1iltfINZegWuGx', // appSecret
    username: 'master', // 超级用户(固定用户名master)
    password: '9O1MZJ5UJwnuZky3tUBiZFPAlDJNs2' // masterSecret
};
var lycamPlus = new LycamPlus(config);
var userInstance = lycamPlus.newUser();     // 获取user操作对象
var streamInstance = lycamPlus.newStream(); // 获取stream操作对象

// 2. 创建server
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.urlEncodedBodyParser());


// 3. 定义路由
//（1）用户
server.post('/user', createUserHandle);         // 创建用户
server.post('/auth', authHandle);               // 用户密码验证
server.put('/password', updatePasswordHandle);  // 用户密码修改
server.post('/assume', assumeHandle);           // 获取指定用户token，用于api鉴权

//（2）视频流
server.post('/stream', createStreamHandle);             // 创建视频流
server.put('/stream', updateStreamHandle);              // 更新视频流
server.get('/stream/:streamId', getStreamHandle);       // 获取指定ID视频流信息
server.get('/streams', getStreamListHandle);            // 获取当前用户视频流列表
server.del('/stream/:streamId', destroyStreamHandle);   // 销毁视频流

// 4. 启动服务
server.listen(PORT, function() {
    console.log('%s listening at %s ', server.name, server.url);
});

// 5. 简单错误处理
server.on('InternalServer', function (req, res, err, cb) {
  err.body = 'something is wrong!';
  return cb();
});


/*************** 用户路由处理 *************/
// 创建用户
function createUserHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var username = data.username;           // 用户名
    var password = data.password;           // 密码
    if (!username || !password) {
        res.send('username and password is required.');
        return next();
    }
    var params = {username: username, password: password};
    userInstance.create(params, function(err) {
        if (err) {
            console.error('create user failed : ', err);
            res.send('create user failed : ' + err.message);
            return next(err);
        }
        console.log('create user ' + username + ' success.');
        res.send('create user ' + username + ' success');
        return next();
    });
}


// 用户密码验证
function authHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var username = data.username;
    var password = data.password;
    if (!username || !password) {
        res.send('username and password is required.');
        return next();
    }

     // 验证用户密码（sdk接口同时支持callback 和 promise）
    userInstance.auth(username, password)
                .then(function(result) {
                    res.send(result);
                    return next();
                })
                .catch(function(err) {
                    console.error('login failed : ', err.message);
                    res.send('login failed : ' + err.message);
                    return next(err);
                });
}


// 更新密码
function updatePasswordHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var uuid = data.uuid;               // 用户uuid
    var password = data.password;       // 新密码
    if (!uuid || !password) {
        res.send('uuid and password is required.');
        return next();
    }

    // 更新用户密码（sdk接口同时支持callback 和 promise）
    userInstance.updatePassword(uuid, password)
                .then(function(result) {
                    console.log('updatePassword success');
                    res.send('updatePassword success');
                })
                .catch(function(err) {
                    console.error('updatePassword failed : ', err);
                    res.send('updatePassword failed : ' + err.message);
                    return next(err);
                });

}

// 获取指定用户token，用于api鉴权
function assumeHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var uuid = data.uuid;               // 用户uuid

    if (!uuid) {
        res.send('uuid is required.');
        return next();
    }

    // '*'： 所有资源
    userInstance.assume(uuid, '*', function(err, result) {
        if (err) {
            console.error('get token failed : ', err);
            res.send('get token failed : ' + err.message);
            return next(err);
        } 

        console.log('get token success. the access_token: ' + result.token.access_token);
        res.send('get token success. the access_token: ' + result.token.access_token);
        return next();
    });

}



/*************** 视频路由处理 *************/
// 创建视频流
function createStreamHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var title = data.title;
    var description = data.description;
    if (!title) {
        res.send('stream \'title\' is required.');
        return next();
    }
    var params = {
        title: title,
        description: description || ''
    };
    streamInstance.create(params, function(err, result) {
        if (err) {
            console.error('create stream ' + title + ' failed.');
            res.send('create stream ' + title + ' failed.'); 
            return next(err);
        }
        res.send(result);
        return next();
    });
}


// 更新视频流
function updateStreamHandle(req, res, next) {
    var data = JSON.parse(req.body);
    var streamId = data.streamId;
    var params = {description: data.description || '6666'};

     if (!streamId) {
        res.send('stream \'streamId\' is required.');
        return next();
    }
    streamInstance.update(streamId, params, function (err) {
        if (err) {
            console.error('update stream : ' + streamId + ' failed.');
            res.send('update stream : ' + streamId + ' failed.');
            return next(err);
        }
        res.send('update stream : ' + streamId + ' success.');
        return next();
    });
}

// 获取指定ID视频流信息
function getStreamHandle(req, res, next) {
    var streamId = req.params.streamId;
    if (!streamId) {
        res.send('stream \'streamId\' is required.');
        return next();
    }
    streamInstance.show(streamId, function(err, stream) {
        if (err) {
            console.error('get stream Info failed.');
            return next(err);
        }
        res.send('streamId=' + streamId + ', title= ' + stream.title);
        return next();
    });
}


// 获取当前用户视频流列表
function getStreamListHandle(req, res, next) {
    streamInstance.list(function(err, streamList) {
        if (err) {
            console.error('get stream list failed.');
            res.send('get stream list failed.');
            return next(err);
        }
        res.send('stream length: ' + streamList.totalItems);
        return next();
    });
}



// 销毁视频流
function destroyStreamHandle(req, res, next) {
    var streamId = req.params.streamId;
    if (!streamId) {
        res.send('stream \'streamId\' is required.');
        return next();
    }
    streamInstance.destroy(streamId, function(err, result) {
        if (err) {
            console.error('destroy stream : ' + streamId + ' failed.');
            res.send('destroy stream : ' + streamId + ' failed.');
            return next(err);
        }
        res.send('destroy stream : ' + streamId  + ' success.');
        return next();
    });
}


