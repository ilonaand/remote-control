import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer, createWebSocketStream  } from 'ws';

import { handler } from './handler';

import { once } from 'events';

import { finished } from 'stream';

import { promisify } from 'util';

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

const finishedPromisify = promisify(finished);

const wss = new WebSocketServer({ server: httpServer });
wss.on('connection', async (ws, req: http.IncomingMessage) => {
    console.log('Start WebSocketServer. IP address of the client ', req.socket.remoteAddress);
    const duplex = createWebSocketStream(ws, { decodeStrings: false } );

    async function write(iterable: string) {
        if (!duplex.write(iterable)) {
            await once(duplex, 'drain');
        }
    };      

    async function run() {
        for await ( let messsage of duplex) {
            const result = await handler(messsage.toString());
            if (result) write(result);
        }
    };

    await run().catch(console.error);

    /* ws.on('message', async (data) => {
        const result = await handler(data.toString());
        if (result) ws.send(result);
    }); */

    wss.on('close', async function close() {
       duplex.end();
       await finishedPromisify(duplex);
    });
});

process.on('SIGINT', () => {
    wss.close();
    httpServer.close(() => process.exit());
  });

  process.on('exit', (code) => {
    if (code === 0) {
     process.kill(process.pid)
    }
   })
  
  process.on('SIGTERM', () => { 
    httpServer.close(() => process.exit());}
  ); 

