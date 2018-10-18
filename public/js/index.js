var socket = io(); //client method from perspective of client

socket.on('connect', function () {
  console.log('Connected to server');

});


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){ // event name and response fxn( with e arg)
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){
  console.log('received message  ', data);
  });// end emit   3 args for emit acknowledgement
});// end jQuery event listener
