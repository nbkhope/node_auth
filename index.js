// Import modules
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Database Setup
mongoose.connect('mongodb://localhost:node_auth/node_auth');

// App Setup
const app = express();
const router = require('./router');

// For logging
app.use(morgan('combined'));
// Parse incoming requests as though they were json
app.use(bodyParser.json({ type: '*/*' }));

// Pass the app to router so it can define the routes
router(app);

// Server Setup
const PORT = process.env.PORT || 3090;
// HTTP Server
const server = http.createServer(app);
server.listen(PORT);
console.log("Server listening on port", PORT);
