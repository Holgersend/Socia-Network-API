// Import the necessary modules from the mongoose library. We import connect and connection.
const { connect, connection } = require('mongoose');

// Define the MongoDB connection string. It uses the value of the MONGODB_URI environment variable
const connectionString = 
process.env.MONGODB_URL ||  'mongodb://127.0.0.1:27017/social-network-db';

// Connect to the MongoDB database using the defined connection string
connect(connectionString);

// Export the 'connection' object. This allows other parts of the application to access the active MongoDB connection.
module.exports = connection;
