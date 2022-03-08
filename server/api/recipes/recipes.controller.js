'use strict';

import {Recipe} from './recipes.model';
import {Review} from './reviews.model';
import {User} from '../users/users.model';

// Find all Recipes
export function index(req, res) {
    Recipe.find()
        .populate('reviews')
        .exec()
        .then(function(recipes) {
            res.json(recipes);
        })
        .catch(function(err) {
            res.status(500);
            console.error(err);
            res.send(err.toString());
        });
}

// Find details for one recipe
export function show(req, res) {
    Recipe.findById(req.params.id)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                res.status(200);
                res.json(existingRecipe);
            } else {
                return Promise.reject(new Error('Recipe not found'));
            }
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

// Find a review by id
export function showReview(req, res) {
    Review.findById(req.params.reviewId)
        .populate('user')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                res.status(200);
                res.json(existingRecipe);
            } else {
                return Promise.reject(new Error('Review not found'));
            }
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

// Create a new recipe
export function create(req, res) {
    let recipe = req.body;
    recipe.reviews = [];
    Recipe.create(recipe)
        .then(function(createdRecipe) {
            res.status(201);
            res.json(createdRecipe);
        })
        .catch(function(err) {
            res.status(400);
            console.error(err);
            res.send(err.toString());
        });
}

// Create a review for a recipe given by recipeId
export function createReview(req, res) {
    let review = req.body;
    let recipeToUpdate = null;
    let createdReview = null;
    Recipe.findById(req.params.recipeId)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                recipeToUpdate = existingRecipe;
                return User.findOne({username: review.userReviewer}).exec();
            } else {
                return Promise.reject(new Error('Recipe not found'));
            }
        })
        .then(function(existingUser) {
            if(existingUser) {
                review.userReviewer = existingUser;
                // Don't allow custom create date
                if(review.createdDate) {
                    review.createDate = null;
                }
                return Review.create(review);
            } else {
                return Promise.reject(new Error('User not found'));
            }
        })
        .then(function(savedReview) {
            recipeToUpdate.reviews.push(savedReview);
            createdReview = savedReview;
            return recipeToUpdate.save();
        })
        .then(function(savedRecipe) {
            res.status(201);
            res.json(createdReview);
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

// Update a Recipe
export function update(req, res) {
    Recipe.findById(req.params.id)
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                existingRecipe.recipeName = req.body.recipeName;
                existingRecipe.description = req.body.description;
                existingRecipe.image = req.body.image;
                existingRecipe.prepTime = req.body.prepTime;
                existingRecipe.cookTime = req.body.cookTime;
                existingRecipe.directions = req.body.directions;
                existingRecipe.ingredients = req.body.ingredients;
                return existingRecipe.increment().save();
            } else {
                return Promise.reject(new Error('Recipe not found'));
            }
        })
        .then(function(savedRecipe) {
            res.status(200);
            res.json(savedRecipe);
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

// Update a Review by Id
export function updateReview(req, res) {
    Recipe.findById(req.params.recipeId)
        .exec()
        .then(function(existingRecipe) {
            if(!existingRecipe) {
                return Promise.reject(new Error('Recipe not found'));
            } else {
                return Review.findById(req.params.reviewId);
            }
        })
        .then(function(existingReview) {
            if(existingReview) {
                // Don't allow user or create date to be changed on an update of a review
                existingReview.description = req.body.description;
                existingReview.rating = req.body.rating;
                return existingReview.increment().save();
            } else {
                return Promise.reject(new Error('Review not found'));
            }
        })
        .then(function(updateStatus) {
            // update method does not return updated object, query for it here to return from API
            return Review.findById(req.params.reviewId);
        })
        .then(function(updatedReview) {
            res.status(200);
            res.json(updatedReview);
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

// Remove a recipe and all its reviews
export function destroy(req, res) {
    Recipe.findById(req.params.id)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                let promises = [];
                existingRecipe.reviews.forEach(review => promises.push(review.remove()));
                promises.push(existingRecipe.remove());
                return Promise.all(promises);
            } else {
                return Promise.reject(new Error('Review not found'));
            }
        })
        .then(function(deletedUser) {
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

// Remove a review from a recipe
export function destroyReview(req, res) {
    Recipe.findById(req.params.recipeId)
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                let reviewIndex = existingRecipe.reviews.indexOf(req.params.reviewId);
                if(reviewIndex !== -1) {
                    existingRecipe.reviews.splice(reviewIndex, 1);
                    return Promise.all([
                        existingRecipe.save(),
                        Review.findByIdAndRemove(req.params.reviewId)
                    ])
                } else {
                    return Promise.reject(new Error('Review not found in recipe'));
                }
            } else {
                return Promise.reject(new Error('Recipe not found'));
            }
        })
        .then(function(results) {
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
