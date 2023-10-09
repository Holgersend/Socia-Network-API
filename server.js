// Import Express.js framework
const express = require('express');

// Import MongoDB connection object
const db = require('./config/connection');

// Import the rout modules
const routes = require('/routes');

// Define the port number to listen on.
// And create an Express application instance
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming URL-encoded data and Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the imported routes to handle incoming requests.
app.use(routes);

// When the MongoDB connection is successfully opened (once event),
// start the Express server and listen on the specified port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    })
})