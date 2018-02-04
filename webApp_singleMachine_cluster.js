// Node.js 采用 单线程 模型，基于 事件驱动的异步非阻塞I/O

// 充分利用 CPU 多核技术 搭建 Node.js 集群
var http = require('http');
var express = require('express');
var cluster = require('cluster');
var os = require('os');

var PORT = 1234;
var CPUS = os.cpus().length; // 获取 CPU 内核数

if (cluster.isMaster) {
	// 当前进程为主进程
	for (var i = 0; i < CPUS; i++) {
		cluster.fork(); // 衍生出一个新的工作进程,只能通过主进程调用。
	}
}
else {
	// 当前进程为子进程
	//var app = http.createServer(function (req, res) {
	//	res.writeHead(200, {'Content-Type': 'text/html'});
	//
	//});

	var app = express();
	var express = require('express');
	app.use(express.static('.'));

	app.get('/hello', function (req, res) { //简单路由
		res.send("hello");
		res.end();
	});

	app.listen(PORT, function (){
		console.log('server is running at %d', PORT);
	});
}