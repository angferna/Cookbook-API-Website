'use strict';

import {Review, Recipe} from './recipes.model';
import {User} from '../users/users.model';


// Find all Recipes
export function index(req, res) {
    /*
     The pattern you see below where one function is
     called right after the other is called method chaining,
     and is a common practice in JavaScript and many other languages
     https://en.wikipedia.org/wiki/Method_chaining
     */
    Recipe.find()
        /*
           For each recipe object, populate the review attribute.
           This will make all the attributes available in the review
           accessible as though the review were a subdocument by joining
           the two tables for you
           http://mongoosejs.com/docs/populate.html
        */
        .populate('review')
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
        .then(function(recipes) {
            res.json({
                recipes
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

// Find details for one recipe
export function show(req, res) {

    Recipe.findById(req.params.recipeId)
        .populate('review')
        .exec()
        .then(function(existingRecipe) {
            /*
             findById will return null if the object was not found
             This if check will evaluate to false for a null recipe
            */
            if(existingRecipe) {
                // Recipe was found by Id
                res.status(200);
                res.json(existingRecipe);
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Find a review by id
export function showReview(req, res) {
    // Check if recipe given exists, if it does, do nothing, if it does not exist return 404 error message
    Recipe.findById(req.params.recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
        })
    // Find Review by id  return 200 status with requested review
    // If the review does not exist, return 404 status with "Not Found" error message
    Review.findById(req.params.reviewId)
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
                res.json({message: 'Review Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Create a new recipe
export function create(req, res) {
    // Save recipe contents to variable from request
    let recipe = req.body;

    // Create recipe
    Recipe.create(recipe)
        // Recipe saved successfully! return 201 with the created recipe object
        .then(function(createdRecipe) {
            res.status(201);
            res.json(createdRecipe);
        })
        // An error was encountered during either the save of the save of the Recipe, return 400 status & error message
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Create a review for a recipe given by recipeId
export function createReview(req, res) {
    /*
   In this function we are taking the request body
   As it was sent and using it as the JSON for the review
   and recipe objects.
   Since review is stored in a separate collection from recipe
   we must create each document individually, and then associate
   the review to the recipe after we know its id
 */
    let review = req.body.review;
    let recipeId = req.params.recipeId;
    let recipe = null;
    // Start off by finding the recipe
    Recipe.findById(recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            /*
             findById will return null if the object was not found
             This if check will evaluate to false for a null recipe
            */
            if(!existingRecipe) {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
            recipe = existingRecipe;
        })
        Review.create(review)
            /*
             Review was successfully saved, now associate saved review to the
            recipe given and then save the recipe
            */
            .then(function(createdReview) {
                recipe.reviews.push(createdReview);
                /*
                    This return statement will return a promise object.
                    That means that the following .then in this chain
                    will not occur until after the Recipe is updated, and will be given the result
                    of this promise resolving, which is the updated recipe object
                */
                return Promise.all([
                    existingRecipe.increment().save()
                ]);
            })
            // Recipe and Review saved/updated successfully! return 201 with the created review object
            .then(function(createdReview) {
                res.status(201);
                res.json(createdReview);
            })
            // An error was encountered during either the save of the review or the update of the review
            .catch(function(err) {
                res.status(400);
                res.send(err);
            });
}

// Update a Recipe
export function update(req, res) {
    // Start by trying to find the recipe by its id
    Recipe.findById(req.params.id)
        .populate('review')
        .exec()
        // Update recipe
        .then(function(existingRecipe) {
            // If recipe exists, update all fields of the object, except review
            if(existingRecipe) {
                existingRecipe.recipeName = req.body.recipeName;
                existingRecipe.description = req.body.description;
                existingRecipe.pictureURL = req.body.pictureURL;
                existingRecipe.ingredients.ingredientsArray = req.body.ingredientsArray;
                existingRecipe.prepTime = req.body.prepTime;
                existingRecipe.cookingTime = req.body.cookingTime;
                existingRecipe.directions = req.body.directions;

                /*
                 Promise.all takes an array of promises as an argument
                 It ensures that all the promises in the array have successfully resolved before
                 continuing the promise chain. It will pass to the next .then an array of results, one
                 for each promise that was passed
                */
                return Promise.all([
                    recipe.increment().save()
                ]);
            } else {
                // Recipe was not found
                return existingRecipe;
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
                // Recipe was not found, return 404 status and Error Message
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
        })
        // Error encountered during the save of the recipe, return 400 status and error message
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Update a Review by Id
export function updateReview(req, res){
    let review = req.body.review;
    let recipeId = req.params.recipeId;
    let recipe = null;
    // Start off by finding the recipe
    Recipe.findById(recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            /*
             findById will return null if the object was not found
             This if check will evaluate to false for a null recipe
            */
            if(!existingRecipe) {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
            recipe = existingRecipe;
        })
    Review.findById(reviewId)
        /*
         Review was successfully saved, now associate saved review to the
        recipe given and then save the recipe
        */
        .then(function(existingReview) {
            existingReview.reviewDescription = req.body.reviewDescription;
            existingReview.ratingReview = req.body.ratingReview;
            existingReview.User = req.body.user;
            /*
                This return statement will return a promise object.
                That means that the following .then in this chain
                will not occur until after the Recipe is updated, and will be given the result
                of this promise resolving, which is the updated recipe object
            */
            return Promise.all([
                recipe.reviews.increment().save()
            ]);
        })
        // Recipe and Review saved/updated successfully! return 201 with the created review object
        .then(function(createdReview) {
            res.status(201);
            res.json(createdReview);
        })
        // An error was encountered during either the save of the review or the update of the review
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Remove a recipe and all its reviews
export function destroy(req, res) {
    // First find the recipe by Id
    Recipe.findById(req.params.recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                /*
                  This is the equivalent of cascading delete in a relational database
                  If the recipe was found, remove both the recipe object and the review object from
                  their respective collections. Only record the delete function as successful if both objects
                  are deleted
                */
                return Promise.all([
                    // Remove all reviews and the recipe
                    existingRecipe.reviews.remove(),
                    existingRecipe.remove()
                ]);
            } else {
                // If the recipe does not exist, return the existingRecipe variable
                return existingRecipe;
            }
        })
        // Delete was successful, return 204 status
        .then(function(deletedRecipe) {
            if(deletedRecipe) {
                res.status(204).send();
            } else {
                // Recipe was not found, return 404 status and "Not Found" error message
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Reviews or recipe delete failed, return 400 status with error message
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Remove a review from a recipe
export function destroyReview(req, res) {
    // First find the recipe by Id
    Recipe.findById(req.params.recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                // Recipe was not found, return 404 status & "Not Found" error message
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
        })
    // Then find review by Id
    Review.findById(req.param.reviewId)
        .then(function(existingReview){
            if(existingReview) {
                /*
                  This is the equivalent of cascading delete in a relational database
                  If the recipe was found, remove both the recipe object and the review object from
                  their respective collections. Only record the delete function as successful if both objects
                  are deleted
                */
                return Promise.all([
                    // If the review exists remove it
                    existingReview.remove()
                ]);
            } else{
                // If the review does not exist, return existingReview
                return existingReview;
            }
        })
        // Delete was successful, return 204 status
        .then(function(deletedReview) {
            if(deletedReview) {
                res.status(204).send();
            } else {
                // Review was not found, return 404 status and "Not Found" error message
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Reviews delete failed, return 400 status and error message
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
