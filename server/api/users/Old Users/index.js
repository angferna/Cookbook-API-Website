import express from 'express';
import * as controller from './users.controller';

// Declare an Express.js Router instance
// let router = express.Router();
let router = express.Router();

// GET Methods
router.get('/', controller.index);
router.get('/:id', controller.show);

// POST Methods
router.post('/', controller.create);

// PUT Methods
router.put('/:id', controller.upsert);

// DELETE Methods
router.delete('/:id', controller.destroy);

// Export the Express.js Router to the routes.js
export {router};
