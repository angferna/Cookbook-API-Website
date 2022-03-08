import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This schema represents user reviews for a given recipe
let reviewSchema = Schema({
    // reviewDescription is a String type that is required
    reviewDescription: {type: String, required: true},
    // ratingReview is a Number type that is required
    ratingReview: {type: Number, required: true},
    // dateCreated is a Date type that is not required to be given by the user because it is automatically set by the server
    dateCreated: {type: Date, required: true, default: Date.now()},
    // userReviewer is referenced as a foreign key with the object ID that is required
    userReviewer: {type: Schema.Types.ObjectId, ref:"User", required: true}
});

/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the nameSchema is embedded within userSchema, it does NOT have
  to be created as a model!
 */
let Review = mongoose.model('Review', reviewSchema);

// Export the created model, Recipes
export {Review};
