// node.js 充当反向代理服务器

var http = require('http');
var httpProxy = require('http-proxy'); // 加载 HTTP Proxy 模块

var PORT = 81;

// 创建代理服务器对象 并 监听错误事件
var proxy = httpProxy.createProxyServer();
proxy.on('error', function (err, req, res) {
	res.send('出错了：' + err);
	res.end();
});

var app = http.createServer(function (req, res) {
	// 执行反向代理
	proxy.web(req, res, {
		target: 'http://localhost:1234' // 目标地址
	})
});

app.listen(PORT, function () {
	console.log('server is running at %d', PORT);
});