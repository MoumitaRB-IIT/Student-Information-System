// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const backend = require('./backend/backend');

app.use(bodyParser.json());

// Use the routes defined in backend.js
app.use('/', backend);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});