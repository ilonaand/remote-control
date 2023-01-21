import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import { mouse } from "@nut-tree/nut-js";

export const httpServer = http.createServer(function (req: http.IncomingMessage, res: http.ServerResponse) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wss = new WebSocketServer({ server: httpServer });
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      console.log('received: %s', data);
    });
});