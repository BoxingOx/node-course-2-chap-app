  const path = require('path');
  const express = require('express');
  const http = require('http');
  const socketIO = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message')
  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);

  app.use(express.static(publicPath));


  io.on('connection', (socket) =>{ // indiv socket as opposed to all of the users server notices that a client has connected. Perspective of server

    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); // executes to that new user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined')); // executes to all other than new user

    socket.on('createMessage',(message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));// end inner io.emit
    callback();
    }); // end outer soket.on for createMessage method type 1

    socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    }); // end outer soket.on for createMessage method type 2

    socket.on('disconnect', () =>{
    console.log('User was disconnected');
    }); // end disconnect event listener

  });// end outer io.on for connection

  server.listen(port, () =>{
    console.log(`Server is up on ${port}`)
  });// end  port listening
