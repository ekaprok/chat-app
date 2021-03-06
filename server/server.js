const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// create a web sockets erver
var io = socketIO(server);

app.use(express.static(publicPath));
// register an event listener
io.on('connection', (socket) => {
  socket.emit('newMessage', {
    from: 'Sma',
    text: 'Hey. This is Sma.',
    createAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
