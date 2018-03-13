const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({
    port: 8000
});

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    const params = location.query;

    ws.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});