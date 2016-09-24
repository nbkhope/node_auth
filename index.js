// Import modules
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App Setup
const app = express();

// For logging
app.use(morgan('combined'));
// Parse incoming requests as though they were json
app.use(bodyParser.json({ type: '*/*' }));

// Server Setup
const PORT = process.env.PORT || 3090;
// HTTP Server
const server = http.createServer(app);
server.listen(PORT);
console.log("Server listening on port", PORT);
