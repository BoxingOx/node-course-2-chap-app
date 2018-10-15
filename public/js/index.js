var socket = io(); //client method from perspective of client

socket.on('connect', function () {
  console.log('Connected to server');

});


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
