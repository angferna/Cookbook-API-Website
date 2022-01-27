// import uuidv4 from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid' ;


class User {
  users = [];

  find() {
    // Returns a list of all users
      return this.users;
  }

  findById(userId) {
    // Find user by Id
      for(let i=0; i< this.users.length; i++) {
          console.log( "ARRAY USER ID " + this.users[i].id + " OR  PASSED IN USER ID"+ userId);
          if(this.users[i].id === userId) {
              console.log("ENTERED IF STATEMENT");

              return this.users[i];
          }
      }
    // Returns user, or null if not present
      return null;
  }

  create(user) {
      // Create a new user
      // Generate the id and overwrite any id that may be present in user
      let id = uuidv4();
      let address = user.address;
      let name = user.name;
      let age = user.age;

      let newUser = {
          id,
          name,
          age,
          address
      }
      this.users.push(newUser);
    // Return created user
      return user;
  }

  findOneAndUpdate(user) {
    // Find user and update
      for(let i=0; i< this.users.length; i++) {
          if(this.users[i].id.toString() === user.id.toString()) {
              this.users[i]=user;
              return true;
          }
      }
    // If user does not exist, create it using Id provided
      this.users.push(user);
    // Return true if user was updated, false if user was created
      return false;
  }

  remove(user) {
    // Remove user if exists with the Id provided
      for(let i=0; i< this.users.length; i++) {
          if(this.users[i].id.toString() === user.toString()) {
              this.users.splice(i, 1);
              return true;
          }
      }
    // Return true if removed
    // Return false if did user not exist
      return false;
  }
}

export default new User();
