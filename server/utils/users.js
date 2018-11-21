[{
  id: '/#wedvbn',
  name: 'Sean',
  room: 'The Office Fans'
}]


    class Users {

      constructor(){
        this.users = [];
      }// end constructor that creates an array for the users
      addUser (id, name, room) {
        var user = {id, name, room}
        this.users.push(user);
        return user;
      }// end addUser that pushes users to users array
      removeUser(id){
        var user = this.getUser(id)
        if(user)
          this.users = this.users.filter((user) => user.id !== id); // if you find this user, overrite the array without them with a filtered array
          return user; //
      }// end removeUser, returns user that was removed
      getUser(id){
        return this.users.filter((user) => user.id === id )[0]// returns an array with objects, it should only have one,  so we return the 1st element
      }// end getUser
      getUserList(room){
        var users = this.users.filter((user) => user.room === room); // es6 function
        var namesArray = users.map((user) => user.name);
        return namesArray;
      }// end GetUserList
    }// end class users

module.exports = {Users};
