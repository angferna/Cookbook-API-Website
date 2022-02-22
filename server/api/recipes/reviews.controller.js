'use strict';

import {Review, Recipe} from './recipes.model';
import {User} from './users.model';
import {Address} from "../users/users.model";

// Find all Reviews
export function index(req, res) {
    /*
     The pattern you see below where one function is
     called right after the other is called method chaining,
     and is a common practice in JavaScript and many other languages
     https://en.wikipedia.org/wiki/Method_chaining
     */
    Review.find()
        /*
           For each review object, populate the user attribute.
           This will make all the attributes available in the address
           accessible as though the address were a subdocument by joining
           the two tables for you
           http://mongoosejs.com/docs/populate.html
        */
        .populate('user')
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
        .then(function(reviews) {
            res.json({
                reviews
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

// Find details for one review
export function show(req, res) {
    Review.findById(req.params.id)
        .populate('user')
        .exec()
        .then(function(existingReview) {
            /*
             findById will return null if the object was not found
             This if check will evaluate to false for a null review
            */
            if(existingReview) {
                // Review was found by Id
                res.status(200);
                res.json(existingReview);
            } else {
                // Review was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Create a new Review
export function create(req, res) {
    /*
      In this function we are taking the request body
      As it was sent and using it as the JSON for the address
      and user objects.
      Since address is stored in a separate collection from user
      we must create each document individually, and then associate
      the address to the user after we know its id
    */

    let user = req.body.userReviewer;
    let review = req.body;
    review.dateCreated = Date.now();

    // Start off by saving the address
    /*
     Address was successfully saved, now associate saved address to the
     user we are about to create and then save the user
    */
    User.findById(user.id)
    .then(function(foundUser) {
        review.userReviewer = foundUser;
        /*
         This return statement will return a promise object.
         That means that the following .then in this chain
         will not occur until after the user is saved, and will be given the result
         of this promise resolving, which is the created user object
        */
        return Review.create(review);
    })
        // Review & user saved successfully! return 201 with the created review object
        .then(function(createdReview) {
            res.status(201);
            res.json(createdReview);
        })
        // An error was encountered during either the save of the review or the user of the review
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Update a Review
export function update(req, res) {
    // Start by trying to find the Review by its id
    Review.findById(req.params.id)
        .populate('user')
        .exec()
        // Update Review
        .then(function(existingReview) {
            // If review exists, update all fields of the object
            if(existingReview) {
                existingReview.recipeName = req.body.recipeName;
                existingReview.description = req.body.description;
                existingReview.pictureURL = req.body.pictureURL;
                existingReview.prepTime = req.body.prepTime;
                existingReview.cookingTime = req.body.cookingTime;
                existingReview.directions = req.body.directions;
                existingReview.reviews = req.body.reviews;

                /*
                 Promise.all takes an array of promises as an argument
                 It ensures that all the promises in the array have successfully resolved before
                 continuing the promise chain. It will pass to the next .then an array of results, one
                 for each promise that was passed
                */
                return Promise.all([
                    existingReview.reviews.save(),
                    existingReview.increment().save()
                ]);
            } else {
                // Recipe was not found
                return existingReview;
            }
        })
        // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
        .then(function(savedObjects) {
            // savedObjects should be defined if Promise.all was invoked (recipe was found)
            if(savedObjects) {
                res.status(200);
                // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
                // the second element of the array is the result of the recipe update
                res.json(savedObjects[1]);
            } else {
                // recipe was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Error encountered during the save of the recipe
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Remove a recipe
export function destroy(req, res) {
    User.findById(req.params.id)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                /*
                  This is the equivalent of cascading delete in a relational database
                  If the recipe was found, remove both the recipe object and the address object from
                  their respective collections. Only record the delete as successful if both objects
                  are deleted
                 */
                return Promise.all([
                    existingRecipe.reviews.remove(),
                    existingRecipe.remove()
                ]);
            } else {
                return existingRecipe;
            }
        })
        // Delete was successful
        .then(function(deletedRecipe) {
            if(deletedRecipe) {
                res.status(204).send();
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Reviews or recipe delete failed
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

