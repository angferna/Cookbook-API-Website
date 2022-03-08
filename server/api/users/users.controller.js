'use strict';

import {Address, User} from './users.model';

// Find all Users
export function index(req, res) {
  /*
   The pattern you see below where one function is
   called right after the other is called method chaining,
   and is a common practice in JavaScript and many other languages
   https://en.wikipedia.org/wiki/Method_chaining
   */
  User.find()
    /*
       For each user object, populate the address attribute.
       This will make all the attributes available in the address
       accessible as though the address were a subdocument by joining
       the two tables for you
       http://mongoosejs.com/docs/populate.html
    */
    .populate('address')
    /*
       exec() runs the query and returns a promise object.
       Promises are a cleaner way to chain asynchronous actions together than
       callbacks because, instead of nesting functions within functions, you can
       chain function calls together and pass the return value from one function
       as the argument to the next! It also allows you to have one method to handle
       exceptions, instead of having to provide them in each callback function you write
       http://www.javascriptkit.com/javatutors/javascriptpromises.shtml
       http://bluebirdjs.com/docs/why-promises.html
    */
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function(users) {
      res.json({
        users
      });
    })
    /*
     Any errors encountered here must be server side, since there are no arguments to the find
     Return 500 (server error) and send the error encountered back to the requester
    */
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one user
export function show(req, res) {
  User.findById(req.params.id)
    .populate('address')
    .exec()
    .then(function(existingUser) {
      /*
       findById will return null if the object was not found
       This if check will evaluate to false for a null user
      */
      if(existingUser) {
        // User was found by Id
        res.status(200);
        res.json(existingUser);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new user
export function create(req, res) {
    let user = req.body;
    User.create(user)
        .then(function(createdUser) {
            res.status(201);
            res.json(createdUser);
        })
        .catch(function(err) {
            res.status(400);
            console.error(err);
            res.send(err.toString());
        });
}

// Update a user
export function update(req, res) {
    User.findById(req.params.id)
        .exec()
        .then(function(existingUser) {
            if(existingUser) {
                // Don't let users update their username
                existingUser.name.firstName = req.body.name.firstName;
                existingUser.name.lastName = req.body.name.lastName;
                existingUser.email = req.body.email;
                return existingUser.increment().save();
            } else {
                return Promise.reject(new Error('User not found'));
            }
        })
        .then(function(updateStatus) {
            // update method does not return updated object, query for it here to return from API
            return User.findById(req.params.id);
        })
        .then(function(savedUser) {
            res.status(200);
            res.json(savedUser);
        })
        .catch(function(err) {
            console.log(err);
            if(err.message.toLowerCase().includes('not found')) {
                res.status(404);
                res.json({message: err.message});
            } else {
                res.status(400);
                console.error(err);
                res.send(err.toString());
            }
        });
}

// Remove a user
export function destroy(req, res) {
    User.findById(req.params.id)
        .exec()
        .then(function(existingUser) {
            if(existingUser) {
                return existingUser.remove();
            } else {
                return Promise.reject(new Error('User not found'));
            }
        })
        .then(function() {
            res.status(204).send();
        })
        .catch(function(err) {
            if(err.message.toLowerCase().includes('not found')) {
                res.status(404);
                res.json({message: err.message});
            } else {
                res.status(400);
                console.error(err);
                res.send(err.toString());
            }
        });
}

