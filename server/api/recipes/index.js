import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
// Get all recipes w/ reviews
router.get('/', controller.index);

// Get specific recipe with review by recipe Id
router.get('/recipe/:recipeId/', controller.show);

// Get specific review by review Id
router.get('/recipe/:recipeId/review/:reviewId', controller.showReview);

// POST methods
// Create a recipe
router.post('/recipe/', controller.create);

// Create a review for a recipe
// If given an id with a POST method, it will create a review for the recipe with the given Id
router.post('/recipe/:recipeId', controller.createReview);

// PUT methods
// Use to update a recipe with given id
router.put('/recipe/:recipeId', controller.update);

// Use to update a review by review Id of a given recipe with given Id
router.put('/recipe/:recipeId/review/:reviewId', controller.updateReview);

// DELETE method
// Use to delete a recipe and its reviews with a given recipe Id
router.delete('/recipe/:recipeId', controller.destroy);

//Use to delete a review by reviewId from a specific recipe from recipeId
router.delete('/recipe/:recipeId/review/:reviewId', controller.destoryReview);

export {router};
