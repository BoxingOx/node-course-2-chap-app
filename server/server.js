  const path = require('path');
  const express = require('express');
  const http = require('http');
  const socketIO = require('socket.io');

  const {generateMessage} = require('./utils/message')
  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);


  app.use(express.static(publicPath));

  io.on('connection', (socket) =>{ // indiv socket as opposed to all of the users server notices that a client has connected. Perspective of server
    console.log('New user connected');



  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage',(message) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))// end inner io.emit
  // socket.broadcast.emit('newMessage',{
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // })  // broadcast to everyone but yourself
  }); // end outer soket.on for createMessage

    socket.on('disconnect', () =>{
      console.log('User was disconnected');
    });

  });// end outer io.on

  server.listen(port, () =>{
    console.log(`Server is up on ${port}`)
  });
