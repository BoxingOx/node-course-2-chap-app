const expect = require('expect');
const {Users} = require('./users');


describe('Users', () =>{

var users;

  beforeEach(() =>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];// end users.users array
  });// end BeforeEach

  it('should add new user', () =>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'Sean',
      room: 'The Office Fans'
    }// end user object
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });// end decscribe 1 it 1

  it('should return names for node course', () =>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  }) // end decscribe 1 it 2

  it('should return names for React course', () =>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  }) // end decscribe 1 it 3

  it('should find  user', () =>{
    var userId = '2';
    var user = users.getUser(userId);  // get the user, thats all
    expect(user.id).toBe(userId);
  }) // end decscribe 1 it 4

  it('should not find  user', () =>{
    var userId = '100';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  }) // end decscribe 1 it 5

  it('should remove a user', () =>{
    var userId = '1';
    var user = users.removeUser(userId); // returns the removed user
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  }) // end decscribe 1 it 46

  it('should not remove a user', () =>{
    var userId = '100';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  }) // end decscribe 1 it 7

});// end describe 1
