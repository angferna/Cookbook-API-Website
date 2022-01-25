import express from 'express';
import * as users from './users';

// Declare an Express.js Router instance
// let router = express.Router();
let router = express.Router();

// GET Methods
router.get('/', users.listContents);
router.get('/:id', users.findOne);

// POST Methods
router.post('/', users.createUser);

// PUT Methods
router.put('/:id', users.updateUser);

// DELETE Methods
router.delete('/:id', users.removeUser);

// Export the Express.js Router to the routes.js
export {router};
