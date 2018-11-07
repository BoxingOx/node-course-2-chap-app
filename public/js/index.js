var socket = io(); //client method from perspective of client

  socket.on('connect', function () {
    console.log('Connected to server');
  });// end connect listener

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });// end disconnect listener

  socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);  // safer to inject li as a var as opposed to appending template String directly
    jQuery('#messages').append(li);// append to existing list i think
  });// end newMessage Listener

  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a); // append the link
    jQuery('#messages').append(li);
  }); // end newLocationMessage listener

  jQuery('#message-form').on('submit', function(e){ // event name and response fxn( with e arg)
    e.preventDefault(); // override default form functions which are dated
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
      from: 'User',
      text: messageTextbox.val()
    },function(){
    //console.log('received message  ', data);
    messageTextbox.val('')// setting the value, clearing this placeholder
    });// end emit   3 args for emit acknowledgement
  });// end jQuery event listener

  var locationButton = jQuery('#send-location');

  locationButton.on('click', function(){
    if(!navigator.geolocation)
    return alert('Geolocation not supported by your browser');
    locationButton.attr('disabled', 'disabled').text('Sending location ...'); // set disabled attribute to disabled
    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })// end emit inside .getCurrentPosition function(position)
      console.log(position);
    }, function(){
      locationButton.removeAttr('disabled').text('Send location');
      alert('UNable to fetch location');
    });// end getCurrentPosition
  });// end .on
