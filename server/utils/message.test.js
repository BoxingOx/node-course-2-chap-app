var expect = require('expect');

var {generateMessage} = require('./message');  // destructuring captures generateMessage from message


describe('generateMessage', () =>{

it('should generate correct message object', () =>{
  var from = 'Randy';
  var text = 'Stan? Staan!'
  var message = generateMessage(from, text);
  expect(message.createdAt).toBeA('number');
  expect(message).toInclude({from,text});
  })// end describe 1 it 1

});// end describe 1
