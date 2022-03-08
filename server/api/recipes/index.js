import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
// Get all recipes w/ reviews -- HTTP Statuses (500 server error, 200 ok)
router.get('/', controller.index);

// Get specific recipe with review by recipe Id -- HTTP Statuses (400 bad request, 200 ok)
router.get('/:id', controller.show);

// Get specific review by review Id -- HTTP Statuses (404 not found, 400 bad request, 200 ok)
router.get('/:recipeId/reviews/:reviewId', controller.showReview);


// POST methods
// Create a recipe -- HTTP statuses (404 Not Found, 400 bad request, 201 created)
router.post('/', controller.create);

// Create a review for a recipe -- HTTP statuses (404 Not Found, 400 bad request, 201 created)
// If given an id with a POST method, it will create a review for the recipe with the given Id
router.post('/:recipeId/reviews', controller.createReview);

// PUT methods
// Use to update a recipe with given id -- HTTP statuses (404 Not Found, 400 bad request, 200 ok)
router.put('/:id', controller.update);

// Use to update a review by review Id of a given recipe with given Id -- HTTP statuses (404 Not Found, 400 bad request, 200 ok)
router.put('/:recipeId/reviews/:reviewId', controller.updateReview);

// DELETE method
// Use to delete a recipe and its reviews with a given recipe Id -- HTTP statuses (404 Not Found, 400 bad request, 204 ok/no content)
router.delete('/:id', controller.destroy);

//Use to delete a review by reviewId from a specific recipe from recipeId -- HTTP statuses (404 Not Found, 400 bad request, 204 ok/no content)
router.delete('/:recipeId/reviews/:reviewId', controller.destroyReview);

export {router};



