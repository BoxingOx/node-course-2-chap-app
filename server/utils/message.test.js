var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');  // destructuring captures generateMessage from message


describe('generateMessage', () =>{
it('should generate correct message object', () =>{
  var from = 'Randy';
  var text = 'Stan? Staan!'
  var message = generateMessage(from, text);
  expect(message.createdAt).toBeA('number');
  expect(message).toInclude({from,text});
  })// end describe 1 it 1
});// end describe 1


describe('generateLocationMessage', () =>{
 it('should generate correct location object', () =>{
   var from = 'Randy';
   var latitude = 15
   var longitude = 16
   var url = 'https://www.google.com/maps?q=15,16';
   var message = generateLocationMessage(from, latitude, longitude);
   expect(message.createdAt).toBeA('number');
   expect(message).toInclude({from,url});
  }); // end describe 2 it 1
});// end describe 2
