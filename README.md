# Lycam+ 直播服务端Node.js SDK

该 SDK 适用于 Node.js 0.4.7 及其以上版本 ，基于 [Lycam+ 官方直播 API](http://wiki.lycam.tv/index.php?title=LycamPlus_WEB_API_接口规范) 构建 。 若您的服务端是一个基于 Node.js 编写
的网络程序，使用此 SDK ，能让您以非常便捷地方式接入我们的服务 ，同时也使得您的服务端更加轻盈 。

## 安装

您可以从 npm 进行安装

```shell
npm install lycamplus-node-sdk
```

也可以从 Github 进行下载安装

```shell
$ git clone https://github.com/lycam-dev/lycamplus-node-sdk.git
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

创建用户到 Lycam+ 系统中 ，以便用户操作 API 接口鉴权使用 。
```
var username: 'admin123';
var password: 'admin123';
userInstance.create(username, password, function(err, result) {
    // 您的代码
});
```
该 SDK 所有 API ，我们都提供了 callback 和 Promise 两种返回操作 。所以 ，您也可以使用如下方式 ：
```
var username: 'admin123';
var password: 'admin123';
userInstance.create(username, password)
            .then(function(result) {
                // 您的逻辑代码
            })
            .catch(function(err) {
                // 您的错误处理代码
            });
```

**请求参数**

| 请求参数       | 是否必须         | 数据类型          | 参数说明                                 |
| ------------- | :-------------: | :-------------: | :-------------------------------------: |
| username      | false           | string          | 用户名，长度为6-80位，如果为空将随机生成      |
| password      | false           | string          | 用户密码，长度8-16位，如果为空将随机生成      |

**返回字段**

| 返回字段       | 数据类型         | 参数说明                                 |
| ------------- | :-------------: | :-------------------------------------: |
| username      | string          | 用户名                                   |
| uuid          | string          | 用户唯一身份标识                           |
| password      | string          | 用户密码（如果密码为随机生成，才返回此字段）    |
| success       | bool            | 成功标志，成功 true，失败 false             |

**2. `用户token获取`**

用户访问Lycam+资源操作接口（比如：推流、收看）时需要用户鉴权，我们使用token进行验证 。
```
userInstance.assume('uuid', '*', function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数       | 是否必须         | 数据类型          | 参数说明                   |
| ------------- | :-------------: | :-------------: | :-----------------------: |
| uuid          | true            | string          | 用户唯一身份标识( 即uuid )   |

**返回字段**

| 返回字段       | 数据类型         | 参数说明                                          |
| ------------- | :-------------: | :---------------------------------------------: |
| success       | bool            | 成功标志，成功 true，失败false                      |
| scope         | string          | 授权资源范围，`*`表示所有资源                        |
| token         | json object     | token对象 。包括 access_token，expires_in 字段等... |


## Stream 对象

获取 Stream 对象并进行操作

```javascript
var streamInstance = lycamPlus.newStream();
```

**1. `创建视频流`**

在 Lycam+ 后台系统中创建一条视频流 。 用于返回给终端用户或实现您自己的业务 。
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

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                      |
| -------------- | :-------------: | :-------------: | :---------------------------:|
| uuid           | false           | string          | 用户唯一身份标识( 即uuid )      |
| title          | false           | string          | 视频流标题                     |
| description    | false           | string          | 视频流描述                     |
| thumbnailUrl   | false           | string          | 视频流封面地址                  | 
| startLat       | false           | float           | 开始视频的维度坐标               |
| startLon       | false           | float           | 开始视频的经度坐标               |
| country        | false           | string          | 国家                           |
| state          | false           | string          | 省份                           |
| city           | false           | string          | 城市                           |
| privacy        | false           | bool            | 是否私有视频（ true是，false否 ） |
| extraInfo      | false           | json object     | 自定义用户信息，格式为 json       |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                       |
| ------------------ | :-------------: | :--------------------------: |
| streamId           | string          | stramId ( 视频流标识 )         |
| status             | string          | 直播状态(live， over，ready)   |
| streamUrls         | json object     | 视频播放资源列表                |
| uploadUrl          | string          | 推流地址                       |
| chatUrl            | string          | 消息服务器地址                  |
| chatChannel        | string          | 消息服务器频道                  |
| resourceUrl        | string          | 视屏 HTML 主页地址              |
| title              | string          | 视频流标题                     |
| description        | string          | 视频流描述                     |
| thumbnailUrl       | string          | 视频流封面地址                  | 
| startLat           | float           | 开始视频的维度坐标               |
| startLon           | float           | 开始视频的经度坐标               |
| country            | string          | 国家                           |
| state              | string          | 省份                           |
| city               | string          | 城市                           |
| privacy            | bool            | 是否私有视频（ true是，false否 ） |
| extraInfo          | object          | 自定义用户信息，格式为 json       |

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

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                      |
| -------------- | :-------------: | :-------------: | :---------------------------:|
| title          | false           | string          | 视频流标题                     |
| description    | false           | string          | 视频流描述                     |
| thumbnailUrl   | false           | string          | 视频流封面地址                  | 
| startLat       | false           | float           | 开始视频的维度坐标               |
| startLon       | false           | float           | 开始视频的经度坐标               |
| endLat         | false           | float           | 视频当前的维度坐标               |
| endLon         | false           | float           | 视频当前的经度坐标               |
| country        | false           | string          | 国家                           |
| state          | false           | string          | 省份                           |
| city           | false           | string          | 城市                           |
| privacy        | false           | bool            | 是否私有视频（ true是，false否 ） |
| extraInfo      | false           | json object     | 自定义用户信息，格式为 json       |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                       |
| ------------------ | :-------------: | :--------------------------: |
| streamId           | string          | stramId ( 视频流标识 )         |
| status             | string          | 直播状态(live， over，ready)   |
| streamUrls         | json object     | 视频播放资源列表                |
| uploadUrl          | string          | 推流地址                       |
| chatUrl            | string          | 消息服务器地址                  |
| chatChannel        | string          | 消息服务器频道                  |
| resourceUrl        | string          | 视屏 HTML 主页地址              |
| title              | string          | 视频流标题                     |
| description        | string          | 视频流描述                     |
| thumbnailUrl       | string          | 视频流封面地址                  | 
| country            | string          | 国家                           |
| state              | string          | 省份                           |
| city               | string          | 城市                           |
| privacy            | bool            | 是否私有视频（ true是，false否 ） |
| ...                |                 | 其它视频流参数

**3. `获取指定ID视频流信息`**

在 Lycam+ 后台系统中获取指定ID的视频流 。  用于返回给终端用户或实现您自己的业务 。

```
streamInstance.show('streamId', function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                      |
| -------------- | :-------------: | :-------------: | :---------------------------:|
| streamId       | true            | string          | stramId ( 视频流标识 )         |
|

**返回字段**

| 返回字段            | 数据类型         | 参数说明                       |
| ------------------ | :-------------: | :--------------------------: |
| streamId           | string          | stramId ( 视频流标识 )         |
| status             | string          | 直播状态(live， over，ready)   |
| streamUrls         | json object     | 视频播放资源列表                |
| uploadUrl          | string          | 推流地址                       |
| chatUrl            | string          | 消息服务器地址                  |
| chatChannel        | string          | 消息服务器频道                  |
| resourceUrl        | string          | 视屏 HTML 主页地址              |
| title              | string          | 视频流标题                     |
| description        | string          | 视频流描述                     |
| thumbnailUrl       | string          | 视频流封面地址                  | 
| startLat           | float           | 开始视频的维度坐标               |
| startLon           | float           | 开始视频的经度坐标               |
| country            | string          | 国家                           |
| state              | string          | 省份                           |
| city               | string          | 城市                           |
| privacy            | bool            | 是否私有视频（ true是，false否 ） |
| extraInfo          | object          | 自定义用户信息 ，格式为 json      |

**4. `获取视频流列表`**

获取 Lycam+ 后台系统中视频流列表 。用于返回给终端用户或实现您自己的业务 。

```
streamInstance.list(function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                            |
| -------------- | :-------------: | :-------------: | :---------------------------------:|
| resultsPerPage | false           | int             | 每页返回记录数 ，默认 10 行            |
| page           | false           | int             | 返回第几页 ，默认第 1 页               |
| sort           | false           | string          | 排序字段（ id，description，created ）|
| order          | false           | string          | 排序方向（ asc，desc ）                |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                         |
| ------------------ | :-------------: | :----------------------------: |
| totalItems         | int             | 记录总数                         |
| resultsPerPage     | int             | 每一页数量                       |
| nextPageAvailable  | bool            | 是否有下一页                     | 
| items              | array           | 视频流清单数组                    |

**5. `获取指定时间前视频流列表`**

在 Lycam+ 后台系统获取指定时间前的视频流列表 。 用于返回给终端用户或实现您自己的业务 。

```
streamInstance.listSince(timestamp, resultsPerPage, function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                            |
| -------------- | :-------------: | :-------------: | :---------------------------------:|
| timestamp      | true            | long            | timestamp ( unix timestamp )       |
| resultsPerPage | false           | int             | 每页返回记录数 ，默认 10 行            |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                         |
| ------------------ | :-------------: | :----------------------------: |
| totalItems         | int             | 记录总数                         |
| resultsPerPage     | int             | 每一页数量                       |
| nextPageAvailable  | bool            | 是否有下一页                     | 
| items              | array           | 视频流清单数组                    |

**6. `通过关键词搜索视频流`**

通过关键词在 Lycam+ 后台系统获取视频流列表 。 用于返回给终端用户或实现您自己的业务 。

```
var params = {
     title: 'title',
     ..
};
streamInstance.searchByKeyword(params, function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                            |
| -------------- | :-------------: | :-------------: | :---------------------------------:|
| keyword        | true            | string          | 搜索关键词                           |
| resultsPerPage | false           | int             | 每页返回记录数 ，默认 10 行            |
| page           | false           | int             | 返回第几页 ，默认第 1 页               |
| sort           | false           | string          | 排序字段（ id，description，created ）|
| order          | false           | string          | 排序方向（ asc，desc ）               |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                         |
| ------------------ | :-------------: | :----------------------------: |
| totalItems         | int             | 记录总数                         |
| resultsPerPage     | int             | 每一页数量                       |
| nextPageAvailable  | bool            | 是否有下一页                     | 
| items              | array           | 视频流清单数组                    |

**7. `通过地理位置搜索视频流`**

通过地理位置在 Lycam+ 后台系统获取视频流列表 。 用于返回给终端用户或实现您自己的业务 。

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

**请求参数**

| 请求参数        | 是否必须         | 数据类型          | 参数说明                            |
| -------------- | :-------------: | :-------------: | :---------------------------------:|
| lon            | true            | float           | 经度
| lat            | true            | float           | 纬度
| radius         | true            | float           | 搜索半径
| resultsPerPage | false           | int             | 每页返回记录数 ，默认 10 行            |
| page           | false           | int             | 返回第几页 ，默认第 1 页               |
| sort           | false           | string          | 排序字段（ id，description，created ）|
| order          | false           | string          | 排序方向（ asc，desc ）               |

**返回字段**

| 返回字段            | 数据类型         | 参数说明                         |
| ------------------ | :-------------: | :----------------------------: |
| totalItems         | int             | 记录总数                         |
| resultsPerPage     | int             | 每一页数量                       |
| nextPageAvailable  | bool            | 是否有下一页                     | 
| items              | array           | 视频流清单数组                    |

**8. `销毁指定ID视频流`**

销毁在 Lycam+ 后台系统中指定ID的视频流 。

```
streamInstance.destroy('streamId', function(err, result) {
    // 您的代码
});
```

**请求参数**

| 请求参数       | 是否必须         | 数据类型          | 参数说明                   |
| ------------- | :-------------: | :-------------: | :-----------------------: |
| streamId      | true            | string          | stramId ( 视频流标识 )      |

**返回字段**

| 返回字段       | 数据类型         | 参数说明                         |
| ------------- | :-------------: | :----------------------------: |
| success       | bool            | 成功标志 。成功 true，失败 false   |
