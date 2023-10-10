// Import modules from the mongoose library
const { Schema, model } = require('mongoose');

// Define a new mongoose schema for the "User" model
const UserSchema = new Schema (
{
    // Define a new schema for the "User" model
    username: {
        type: String,         // Field type is String
        unique: true,         // Ensures usernames are unique in the database
        required: true,       // Requires this field to be provide
        trim: true,           // Trims (removes) any leading/trailing whitespace 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/],
    },
    // Define the "thoughts" field as an array of ObjectIds
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',    // References the 'Thought' model
        },
    ],
    // Define the "friends" field as an array of ObjectIds
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',       // References the 'User' model (self-reference)
        },
    ],
},
{
    // Include virtuals when converting the document to JSON
    toJSON: {
        virtuals: true,
    },
    id: false,
},
);

// virtual that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function () { 
    return this.friends.length;
});


const User = ('User', UserSchema);

module.exports = User;
