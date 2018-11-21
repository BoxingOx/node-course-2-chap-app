var socket = io(); //client method from perspective of client

function scrollToBottom() {
  var messages =jQuery('#messages');
  var newMessage = messages.children('li:last-child'); // message added just before call to scrollToBottom

  var clientHeight = messages.prop('clientHeight'); //just after new value entered. We wanna move it down to new bottom
  var scrollTop = messages.prop('scrollTop');  // we also want to change this value
  var scrollHeight = messages.prop('scrollHeight'); // new height. clientheight not 100% at bottom now.
  var newMessageHeight =newMessage.innerHeight(); // height of the new message
  var lastMessageHeight = newMessage.prev().innerHeight(); // looks at the penultimate element

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
  messages.scrollTop(scrollHeight); // chained method to scroll down to bottom
}// end fxn scrollToBottom


  socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);  // grabs stuff from chat.html in global search bar Once it is filled by user, I think

    socket.emit('join', params, function(err){  // this executes once params has its parameters I think
      if (err){
        alert(err);
        window.location.href = '/';
      }else{
        console.log('No error');
      }
    })
  });// end connect listener

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });// end disconnect listener
  socket.on('updateUserList', function (users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user){
      ol.append(jQuery('<li></li>').text(user)); // append stuff to list you want to show. now lets connect this list to the DOM...
    });// end forEach
      jQuery('#users').html(ol); // we dont use append, as we want to completely replace the list with the new version. Its just easier
  });// end updateUserListListener

  socket.on('newMessage', function (message) {
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#message-template').html();  // html returns the markup inside message-temlatte
      var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      }); // actually renders the stuff inside of the template variable. It could be many things

    jQuery('#messages').append(html);
      scrollToBottom();
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);  // safer to inject li as a var as opposed to appending template String directly
    // jQuery('#messages').append(li);// append to existing list i think
  });// end newMessage Listener

  socket.on('newLocationMessage', function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#location-message-template').html();
      var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
      }); // end Mustache.render
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a); // append the link
    // jQuery('#messages').append(li);
  }); // end newLocationMessage listener

  jQuery('#message-form').on('submit', function(e){ // event name and response fxn( with e arg)
    e.preventDefault(); // override default form functions which are dated
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{

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
