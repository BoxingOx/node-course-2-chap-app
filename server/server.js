  const path = require('path');
  const express = require('express');
  const http = require('http');
  const socketIO = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message');
  const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);
  var users = new Users();

  app.use(express.static(publicPath));


  io.on('connection', (socket) =>{ // indiv socket as opposed to all of the users server notices that a client has connected. Perspective of server

    console.log('New user connected');

    socket.on('join', (params, callback) =>{   // This receives the global params ( that can be seen in the url Bar once join is executed)
      if(!isRealString(params.name) || !isRealString(params.room))
        return  callback('name and room name are required');

        socket.join(params.room);  // join is a library it can be used to create rooms/ forums
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //for the specific room update just that room
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); // executes to that new user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); // executes to all other than new user
        callback();
    });// end join listener

    socket.on('createMessage',(message, callback) =>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text))
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));// end inner io.emit
    callback();
    }); // end outer soket.on for createMessage method type 1

    socket.on('createLocationMessage', (coords)=>{
      var user = users.getUser(socket.id);
          if(user)
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }); // end outer soket.on for createMessage method type 2

    socket.on('disconnect', () =>{
      var user = users.removeUser(socket.id);
      if (user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      }// end if statement
    }); // end disconnect event listener

  });// end outer io.on for connection

  server.listen(port, () =>{
    console.log(`Server is up on ${port}`)
  });// end  port listening
