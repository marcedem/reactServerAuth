const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // make sure the email is unique
    password: String
});


// Create the model class
const ModelClass = mongoose.model('users', userSchema ); // represent all users or a class of users


// Export the model
module.exports = ModelClass;