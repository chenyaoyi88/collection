const WebSocket = require('ws');
const url = require('url');
const fs = require('fs');

const wss = new WebSocket.Server({
    port: 8000
});


wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    const params = location.query;

    // 连接成功的时候发送消息给每个客户端
    console.log('客户端ID为：' + params.clientID + ' 的用户进来了');

    // 接受客户端发送过来的信息
    ws.on('message', function message(data) {
        // 给每个 open 状态的客户端发送广播消息
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

});