import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
    This section declares the schemas for the different documents
    that will be used
 */

// This schema represents the name of the user
let nameSchema = Schema({
    // firstName is a simple String type that is required
    firstName: {type: String, required: true},
    // lastName is a simple String type that is required
    lastName: {type: String, required: true}
});

// This is the main user schema
let userSchema = Schema({
    /*
    Name is a subdocument of User, and will be stored
    in the same document as the User itself.
    Unlike a populated document, this doesn't require an
    ObjectId reference and the schema for name can be
    referenced directly
    */
    name: nameSchema,
    // username is a String type that is required and unique
    username: {type: String, required: true, unique: true},
    // emailAddress is a String type that is required and unique
    emailAddress: {type: String, required: true, unique: true}
});

/*
    This section creates interactive models from the defined schemas
    above so that you can perform Create Read Update and Delete (CRUD)
    operations against the schemas.
    NOTE since the nameSchema is embedded within userSchema, it does NOT have
    to be created as a model!
 */

let User = mongoose.model('User', userSchema);

// Export the two created models, Address and User
export {User};
