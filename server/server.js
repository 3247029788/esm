// const WebSocket = require('ws')
// const wss = new WebSocket.Server({port: 3000})
// wss.on('connection', ws=>{
//     console.log('我进来了！')

//     ws.on('close', ()=>{
//         console.log('我走了！')
//     })
// })

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
    });
    socket.on('disconnect', () => {
        console.log('走了！');
    });
});

server.listen(5500, () => {
  console.log('listening on *:3000');
});