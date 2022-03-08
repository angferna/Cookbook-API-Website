import mongoose from 'mongoose';

// import User from the users.model file because it is referenced in the reviewSchema
import User from '../users/users.model';


let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This schema represents the array of ingredients for a given recipe
let ingredient = Schema({
    // name is a String type that is required
    name: {type: String, required: true},
    // amount is a String type that is required
    amount: {type: String, required: true}
});


// This schema represents a recipe
let recipeSchema = Schema({
    // recipeName is a simple String type that is required
    recipeName: {type: String, requires: true},
    // description is a String type that is required
    description: {type: String, required: true},
    // pictureURL is a String type that is required
    pictureURL: {type: String, required: true},
    // prepTime is a Number type that is required
    prepTime: {type: Number, required: true},
    // cookingTime is a Number type that is required
    cookingTime: {type: Number, required: true},
    // directions is an Array that is required
    directions: {type: [String], requires: true},
    // ingredients is a subdocument that is required
    ingredients: {type: [ingredient], required: true},
    // reviews is referenced as a foreign key with the object ID that is not required
    // this is not requires, because reviews can only be made after a recipe already exists,
    // and are not required for the existence of the recipe
    reviews: {type: [Schema.Types.ObjectId], required: false, ref: "Review"}
}, { usePushEach: true });


/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the ingredientSchema is embedded within recipeSchema, it does NOT have
  to be created as a model!
 */
let Recipe = mongoose.model('Recipe', recipeSchema);

// Export the two created models, Review and Recipe
export {Recipe};
