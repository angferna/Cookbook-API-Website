import express from 'express';
import * as controller from './users.controller';

let router = express.Router();

// GET methods
// Show all users -- HTTP Statuses (500 server error, 200 ok)
router.get('/', controller.index);

// Show user by Id -- HTTP Statuses (400 bad request, 200 ok)
router.get('/:id', controller.show);

// POST method
// Create a new user -- HTTP statuses (404 Not Found, 400 bad request, 201 created)
router.post('/', controller.create);

// PUT method
// Update existing user by Id -- -- HTTP statuses (404 Not Found, 400 bad request, 200 ok)
router.put('/:id', controller.update);

// DELETE method
// Delete existing user by Id -- HTTP statuses (404 Not Found, 400 bad request, 204 ok/no content)
router.delete('/:id', controller.destroy);

export {router};
