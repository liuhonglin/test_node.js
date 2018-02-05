var zookeeper = require("node-zookeeper-client");

var CONNECTION_URL = '10.112.42.111:2181';
var OPTIONS = {
	sessionTimeout: 5000
};

// Node.js 客户端仅提供了异步方式
var zk = zookeeper.createClient(CONNECTION_URL, OPTIONS);

zk.on('connected', function () {
	console.log('连接成功，连接信息：');
	console.log(zk);
	console.log('\n');
	//zk.close();
});

zk.connect();

// 获取根目录下所有子节点
zk.getChildren('/', function (error, children, stat) {
	if (error) {
		console.log(error.stack);
		return;
	}

	console.log('所有子节点：' + children);
});

// 检查节点是否存在
zk.exists('/foo', function (error, stat) {
	if (stat) {
		console.log('node: [/foo]  exists');
	} else {
		console.log('node: [/foo] does not exist');
	}
});

// 创建节点, 函数签名：void create(path, [data], [acls], [mode], callback)
zk.create('/foo', new Buffer('Hello Node.js'), function (error, path) {
	if (error) {
		console.log('创建节点失败：' + error.stack);
	} else {
		console.log('成功创建节点：' + path);
	}
});

zk.getData('/foo', function (error, data, stat) {
	console.log('节点:[/foo] 的值：' + data.toString());
});

// 修改数据
zk.setData('/foo', new Buffer('Hi Node.js'), function (error, stat) {
	if (error) {
		console.log('修改节点数据失败：' + error.stack);
	} else {
		console.log('成功修改节点数据.');
	}
});

// 删除节点，函数签名：void remove(path, [version], callback); #version: 表示节点数据的版本，默认是-1，表示最新版本.
zk.remove('/foo', function (error) {
	if (!error) {
		console.log('node [/foo] is deleted.');
	}
});
//zk.close();