# Lycam+ 直播服务端Node.js SDK

该 SDK 适用于 Node.js 0.4.7 及其以上版本 ，基于 [Lycam+ 官方直播 API](http://wiki.lycam.tv/index.php?title=LycamPlus_WEB_API_接口规范) 构建 。 若您的服务端是一个基于 Node.js 编写
的网络程序，使用此 SDK ，能让您以非常便捷地方式接入我们的服务 ，同时也使得您的服务端更加轻盈 。

## 安装

您可以从 npm 进行安装

```shell
npm install lycam-node-sdk
```

也可以从 Github 进行下载安装

```shell
$ git clone https://github.com/Cheng-Bin/lycamplus-node-sdk.git
$ cd lycamplus-node-sdk
$ npm install .
```

## 测试

Lycam+ Node.js SDK 使用 Mocha 进行单元测试 。

```shell
$ npm install -g Mocha
$ npm test
```

## 使用

### 配置 config 并创建 SDK 实例

设置全局参数 ，包括必须的 appKey ，appSecret 和 password ，配置参数将会延至所有空间 。
```javascript
var config = {
    appKey:     <您申请到的 AppKey>
    appSecret:  <您申请到的 AppSecret>
    password:   <您申请到的 masterSecret>
};
```

创建 SDK 实例 。
```javascript
var lycamPlus = new LycamPlus(config);
```

## User 对象

获取 User 对象并进行操作

```javascript
var userInstance = lycamPlus.newUser(); 
```

**1. `创建用户`**

创建用户到 Lycam+ 系统中 。以便用户操作 API 接口鉴权使用 。
```
var params = {
    username: 'admin123',
    password: 'admin123'
    ...
};
userInstance.create(params, function(err, result) {
    // 您的代码
});
```
SDK 的所有异步 API，我们都提供了 callback 和 promise 两种返回操作。所以，您也可以使用如下方式 ：
```
var params = {
    username: 'admin123',
    password: 'admin123'
    ...
};
userInstance.create(params)
            .then(function(result) {
                // 您的逻辑代码
            })
            .catch(function(err) {
                // 您的错误处理代码
            });
```

**2. `用户密码验证`**

如果您不想在自己的后台系统中做密码验证功能，可以直接使用我们给您提供的验证接口 。
```
userInstance.auth('username', 'password', function(err, result) {
    // 您的代码
});
```

**3. `更新用户密码`**

如果您不想在自己的后台系统中做密码修改功能，可以直接使用我们给您提供的修改接口 。
```
userInstance.updatePassword('username', 'newpassword', function(err, result) {
    // 您的代码
});
```

**4. `用户token获取`**

用户访问Lycam+资源操作接口（比如：推流、收看）时需要用户鉴权，我们使用token进行验证 。
```
userInstance.assume(uuid, '*', function(err, result) {
    // 您的代码
});
```

**5. `查询用户`**

使用关键字查询已经注册到 Lycam+ 系统中的用户，便于您做第三方逻辑 。
```
var params = {
    username: 'username',
    ...
};
userInstance.search(params, function(err, result) {
    // 您的代码
});
```

**6. `获取用户列表`**

获取已经注册到 Lycam+ 系统中的用户列表，便于您做第三方逻辑 。
```javascript
userInstance.list({}, function(err, users) {
   // 您的代码
});
```

## Stream 对象

获取 Stream 对象并进行操作

```javascript
var streamInstance = lycamPlus.newStream(); 
```

**1. `创建视频流`**

在 Lycam+ 后台系统中创建一条视频流 。
```
var params = {
    user: 'uuid', 
    title: 'test',
    ...
};
streamInstance.create(params, function(err, result) {
   // 您的代码
});
```

**2. `更新指定ID视频流`**

在 Lycam+ 后台系统中更新指定ID视频流信息 。
```
var params = {
    'description': '视频描述',
    ...
};
streamInstance.update('streamId', params, function(err, result) {
    // 您的代码                    
});
```

**3. `获取指定ID视频流信息`**

```
streamInstance.show('streamId', function(err, result) {
    // 您的代码
});
```

**4. `获取视频流列表`**

```
streamInstance.list(function(err, result) {
    // 您的代码
});
```

**5. `获取指定时间前视频流列表`**

```
streamInstance.listSince(timestamp, function(err, result) {
    // 您的代码
});
```

**6. `通过关键词搜索视频流`**

```
var params = {
     title: 'title',
     ..
};
streamInstance.searchByKeyword(params, function(err, result) {
    // 您的代码
});
```

**7. `通过地理位置搜索视频流`**

```
var params = {
    lon: '0',
    lat: '0',
    ..
};
streamInstance.searchByLocation(params, function(err, result) {
    // 您的代码
});
```

**8. `销毁指定ID视频流`**

```
streamInstance.destroy('streamId', function(err, result) {
    // 您的代码
});
```